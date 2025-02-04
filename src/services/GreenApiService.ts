import axios, { AxiosError } from "axios";
import { IMessage } from "../types";

interface IValidateWhatsAppResponse {
  success: boolean;
  exists?: boolean;
}

interface IReceiveMessagesResponse {
  success: boolean;
  newMessage?: IMessage;
}

interface ISendMessageResponse {
  success: boolean;
  idMessage?: string;
}
interface IValidateLogin {
  id: string;
  apiToken: string;
}

interface ISetAuthParams {
  id: string;
  apiToken: string;
}

interface IContactInfo {
  avatar: string;
  name: string;
  chatId: string;
}
interface IGreenApiService {
  setAuthParams(params: ISetAuthParams): void;
  validateLogin(
    params: IValidateLogin
  ): Promise<{ success: boolean; error?: string }>;
  validateWhatsAppNumber(
    phoneNumber: string
  ): Promise<IValidateWhatsAppResponse>;
  sendMessage(chatId: string, message: string): Promise<ISendMessageResponse>;
  receiveNotification(): Promise<IReceiveMessagesResponse>;
  getChatMessages(chatId: string): Promise<IMessage[]>;
  getContactInfo(phoneNumber: string): Promise<IContactInfo>;
  clearMessagesQueue(): Promise<void>;
}

class GreenApiService implements IGreenApiService {
  private apiUrl: string;
  private idInstance: string | null;
  private apiTokenInstance: string | null;
  private readonly WHATSAPP_SUFFIX = "@c.us";
  private readonly TEXT_MESSAGE_TYPE = "textMessage";
  private readonly EXTENDED_TEXT_MESSAGE_TYPE = "extendedTextMessage";

  constructor() {
    this.apiUrl = import.meta.env.VITE_GREEN_API_URL;
    if (
      import.meta.env.VITE_GREEN_API_URL === "https://your-green-api-url.com"
    ) {
      console.warn(
        "Please update the VITE_GREEN_API_URL environment variable in your .env file with the proper API URL."
      );
    }
    this.idInstance = null;
    this.apiTokenInstance = null;
  }

  private getApiUrl(endpoint: string): string {
    if (!this.idInstance || !this.apiTokenInstance) {
      throw new Error("API credentials not set.");
    }
    return `${this.apiUrl}/waInstance${this.idInstance}/${endpoint}/${this.apiTokenInstance}`;
  }

  async getChatMessages(chatId: string): Promise<IMessage[]> {
    const url = this.getApiUrl("getChatHistory");

    try {
      const response = await axios.post(url, { chatId, count: 20 });
      if (response.status === 200) {
        return response.data
          .filter(
            (msg: IMessage) =>
              msg.typeMessage === this.TEXT_MESSAGE_TYPE ||
              msg.typeMessage === this.EXTENDED_TEXT_MESSAGE_TYPE
          )
          .map(({ type, idMessage, chatId, textMessage }: IMessage) => ({
            type,
            idMessage,
            chatId,
            textMessage,
          }))
          .reverse();
      }
      return [];
    } catch (error) {
      console.error(error, "Invalid phoneNumber");
      return [];
    }
  }

  async getContactInfo(phoneNumber: string): Promise<IContactInfo> {
    const chatId = `${phoneNumber}${this.WHATSAPP_SUFFIX}`;
    const url = this.getApiUrl("getContactInfo");
    try {
      const response = await axios.post(url, {
        chatId,
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return { avatar: "", name: "", chatId: "" };
      }
    } catch (error) {
      console.error(error, "Invalid phoneNumber");
      return { avatar: "", name: "", chatId: "" };
    }
  }

  setAuthParams({ id, apiToken }: ISetAuthParams): void {
    this.idInstance = id;
    this.apiTokenInstance = apiToken;
  }

  async validateLogin({
    id,
    apiToken,
  }: IValidateLogin): Promise<{ success: boolean; error?: string }> {
    this.idInstance = id;
    this.apiTokenInstance = apiToken;
    const url = this.getApiUrl("getStateInstance");

    try {
      const response = await axios.get(url);
      if (response.data.stateInstance === "authorized") {
        return { success: true };
      }
      return { success: false, error: "Not authorized" };
    } catch (error) {
      console.error(error, "Invalid credentials");
      return { success: false, error: "Incorrect credentials" };
    }
  }

  // Function to validate a WhatsApp number
  async validateWhatsAppNumber(
    phoneNumber: string
  ): Promise<IValidateWhatsAppResponse> {
    const url = this.getApiUrl("checkWhatsapp");

    try {
      const response = await axios.post(url, {
        phoneNumber: Number(phoneNumber),
      });

      if (response.data.existsWhatsapp) {
        return {
          success: true,
          exists: response.data.existsWhatsapp,
        };
      } else {
        return {
          success: false,
        };
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error in checkWhatsapp API:", axiosError.message);
      return { success: false };
    }
  }

  // Function to send a message
  async sendMessage(
    chatId: string,
    message: string
  ): Promise<ISendMessageResponse> {
    const url = this.getApiUrl("sendMessage");

    try {
      const response = await axios.post(url, {
        chatId,
        message: message,
      });

      if (response.status === 200) {
        console.log("Message sent successfully!");
        return { success: true, idMessage: response.data.idMessage };
      } else {
        return { success: false };
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error in sendMessage API call:", axiosError.message);
      return { success: false };
    }
  }

  async receiveNotification(): Promise<IReceiveMessagesResponse> {
    const url = this.getApiUrl("receiveNotification");

    try {
      const response = await axios.get(url);
      if (response.status !== 200) {
        return { success: false };
      }
      const receiptId = response.data?.receiptId;
      const body = response.data?.body;
      let result: IReceiveMessagesResponse = {
        success: false,
      };

      if (body) {
        if (body.typeWebhook === "outgoingAPIMessageReceived" && receiptId) {
          await this.deleteNotification(receiptId);
          return { success: false };
        }
        if (
          body.messageData &&
          body.messageData.typeMessage === this.TEXT_MESSAGE_TYPE
        ) {
          const newMessage: IMessage = {
            chatId: body.senderData.chatId,
            idMessage: body.idMessage,
            type: "incoming",
            textMessage: body.messageData.textMessageData.textMessage,
          };
          result = { success: true, newMessage };
        }
      }
      if (receiptId) {
        await this.deleteNotification(receiptId);
      }
      return result;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error in receiveMessages API call:", axiosError.message);
      return { success: false };
    }
  }

  private async deleteNotification(receiptId: number): Promise<void> {
    const url = this.getApiUrl("deleteNotification");
    const urlWithReceiptId = `${url}/${receiptId}`;
    try {
      const response = await axios.delete(urlWithReceiptId);

      if (response.status === 200) {
        console.log(`Notification ${receiptId} removed`);
      } else {
        console.error(
          `Error deleting notification ${receiptId}:`,
          response.statusText
        );
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error deleting notification:", axiosError.message);
    }
  }

  async clearMessagesQueue(): Promise<void> {
    const url = this.getApiUrl("clearMessagesQueue");

    try {
      const response = await axios.get(url);

      if (response.status === 200) {
        console.log(`messages cleared`);
      } else {
        console.error(`Error deleting message`, response.statusText);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error deleting message:", axiosError.message);
    }
  }
}

const greenApiService = new GreenApiService();
export default greenApiService;
