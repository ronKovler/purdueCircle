package com.purduecircle.backend.AdditionalResources;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Component
public class WebSocketEventListener {
    @EventListener
    public void handleSessionSubscribedEvent( SessionSubscribeEvent event) {
        //int userID = event.get

        System.out.println("\n\nEVENT SUBSCRIBED : SOURCE: " + event.getSource()+"\n\n\n\n" + event.toString() + "\n\n\n\n");

    }
}
