import { Component, OnInit } from "@angular/core";
import {
  HubConnection,
  HubConnectionBuilder,
  HttpTransportType,
} from "@aspnet/signalr";
import * as signalR from "@aspnet/signalr";
@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit {
  private _hubConnection: HubConnection;
  nick = "";
  message = "";
  broadcastmessage = "";
  recipientId = "";
  messages: string[] = [];
  broadcastmessages: string[] = [];

  public sendMessage(): void {
    this._hubConnection
      .invoke("Send", this.nick, this.message)
      .then(() => (this.message = ""))
      .catch((err) => console.error(err));
  }
  sendtoOne() {
    var sentDate = new Date().toLocaleString();
    let payload1 = {
      toId: this.recipientId,
      message: this.message,
      sentDate: sentDate,
      MessageType: 2,
    };
    this._hubConnection.invoke("SendToOne", payload1);
this.messages.push("Me: " + this.message);
    (this.recipientId = ""), (this.message = "");

  }

//SendToAll
sendtoAll() {
  var sentDate = new Date().toLocaleString();
 let pl1 = {
    //userId: $chatWindow.attr('data-userid'),
    message: this.broadcastmessage,
    sentDate: sentDate
};
  this._hubConnection.invoke("SendToAll", pl1);
   (this.broadcastmessage = "");
}


  ngOnInit() {
    let token = localStorage.getItem("ChatToken");

    this._hubConnection = new HubConnectionBuilder()
      .withUrl("https://test.vista-quote.com/Chat", {
        accessTokenFactory: () => token, // Return access token
      })
      .configureLogging(signalR.LogLevel.Debug)
      .build();


    this._hubConnection.on("Send", (nick: string, message: string) => {
      const text = `${nick}: ${message}`;
      this.messages.push(text);
    });


    this._hubConnection.on('ReceiveByOne', (data) => {

   this.messages.push(data.fromId+": " + data.message);
  });


  this._hubConnection.on('ReceiveByAll', (data) => {

    this.broadcastmessages.push(data.fromId+": "+data.message);
  });

    this._hubConnection
      .start()
      .then(() => console.log("Connection started!"))
      .catch((err) => {
        console.log("Error while establishing connection : " + err);
      });
  }
}
