import WebSocket, {WebSocketServer} from 'ws';
import http from 'http';
import request = require('http');

const server=http.createServer(function(Request:any,Response:any)){
    
    console.log((new Date())+ ' Recieved Request for '+ Request.url)
    Response.end("hi there");
});