import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessageBody } from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';
import { ChatsService } from 'src/chats/chats.service';
import { CreateMessageDto, CreateMessageInfoDto } from './dto/create-message.dto';
import { Message } from './messages.model';
import { MessagesService } from './messages.service';
import Request from "express";
import { TokenMiddleware } from './token.midlleware';
// import { Request } from 'express';

@WebSocketGateway(5001, { cors: '*' })
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() wss: Server;

	constructor(private messagesService: MessagesService,
		private chatsService: ChatsService) { }

	afterInit(server: Server) {
		console.log('Initialized');
		server.use((socket, next) => {
			const token = socket.handshake.auth.token;
			console.log(token);
			console.log("tyt");
		});
		//@ts-ignore
		// server.use(new TokenMiddleware());
	}

	handleDisconnect(client: Socket) {
		console.log(`Client Disconnected: ${client.id}`);
	}

	handleConnection(client: Socket, res: Request, ...args: any[]) {
		console.log(`Client Connected: ${client.id}`);
		// console.log(client.client);
		// console.log(client);
		// const token = res.headers['authorization']?.split(' ')[1];
		// console.log(token);
	}

	@SubscribeMessage("message")
	async handleSendMessage(@MessageBody() message: string) {
		const messageInfo: CreateMessageInfoDto = JSON.parse(message);
		let messageResponse: Message;
		if(messageInfo.chatId !== undefined){
			messageResponse = await this.messagesService.create({
				chatId: messageInfo.chatId,
				senderId: messageInfo.senderId,
				roleSenderId: messageInfo.roleSenderId,
				content: messageInfo.content,
				isRead: messageInfo.isRead
			})
		}
		else{
			const response = await this.chatsService.create({
				userId: messageInfo.userId ?? 1,
				companyId: messageInfo.senderId
			});
			messageResponse = await this.messagesService.create({
				chatId: response.id,
				senderId: messageInfo.senderId,
				roleSenderId: messageInfo.roleSenderId,
				content: messageInfo.content,
				isRead: messageInfo.isRead
			})
		}
		this.wss.emit("message", messageResponse);
		return messageResponse;
	}
}