//
//  ContentView.swift
//  PiDevNet Commander
//
//  Created by Logan on 10/17/19.
//

import SwiftUI
import SwiftMQTT

let mqttSession = MQTTSession(
    host: "test.mosquitto.org",
    port: 1883,
    clientID: "Swift", // must be unique to the client
    cleanSession: true,
    keepAlive: 15,
    useSSL: false
)



struct ContentView: View {
    var body: some View {
        HStack {
            Button(action: {
                mqttSession.connect { error in
                    if error == .none {
                        print("Connected!")
                        let message = "RL1ON"
                        let data = message.data(using: .utf8)!
                        let topic = "459123459"
                        mqttSession.publish(data, in: topic, delivering: .atLeastOnce, retain: true) { error in
                            if error == .none {
                                print("Published data in \(topic)!")
                            } else {
                                print("rip" + error.description)
                            }
                        }
                    } else {
                        print(error.description)
                    }
                }
            }) {
                Text("Turn LEDs on")
            }
            Text("Jordan Gae")
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            Button(action: {
                mqttSession.connect { error in
                    if error == .none {
                        print("Connected!")
                        let message = "RL1OFF"
                        let data = message.data(using: .utf8)!
                        let topic = "459123459"
                        mqttSession.publish(data, in: topic, delivering: .atLeastOnce, retain: true) { error in
                            if error == .none {
                                print("Published data in \(topic)!")
                            } else {
                                print(error.description)
                            }
                        }
                    } else {
                        print(error.description)
                    }
                }
            }) {
                Text("Turn LEDs off")
            }
        }
    }
}




struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
