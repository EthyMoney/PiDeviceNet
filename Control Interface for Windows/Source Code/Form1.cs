using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;

namespace RoomCommander
{
    public partial class Form1 : Form
    {
        //
        //////////////////////////////////////////////////
        //
        //

        // Set your MQTT topic here! This topic is where this app
        // will publish commands and listen for feedback

        private static String MQTT_TOPIC = "459123459"; //change this to yours!

        //
        //
        /////////////////////////////////////////////////
        //


        MqttClient client;
        public Form1()
        {
            InitializeComponent();
        }

        private void LedOnButton_Click(object sender, EventArgs e)
        {
          client.Publish(MQTT_TOPIC, // topic
          Encoding.UTF8.GetBytes("RL1ON"), // message body
          MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, // QoS level
          true); // retained
          sendStatusRequest();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            ledRelayStatusLabel.Text = " ";
            client = new MqttClient("test.mosquitto.org");
            byte code = client.Connect(Guid.NewGuid().ToString());

            client.Publish(MQTT_TOPIC, // topic
            Encoding.UTF8.GetBytes("Windows Commander Interface is online!"), // message body
            MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, // QoS level
            true); // retained

            client.Subscribe(new string[] { MQTT_TOPIC },
                 new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE});
            
            client.MqttMsgPublishReceived += client_MqttMsgPublishReceived; // Add event handler

            // Attempt to display current initial status
            sendStatusRequest();
        }

        private void LedOffButton_Click(object sender, EventArgs e)
        {
            client.Publish(MQTT_TOPIC, // topic
            Encoding.UTF8.GetBytes("RL1OFF"), // message body
            MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, // QoS level
            true); // retained
            sendStatusRequest();
        }

        private void GetLedStatusButton_Click(object sender, EventArgs e)
        {
            sendStatusRequest();
        }

        void client_MqttMsgPublishReceived(object sender, MqttMsgPublishEventArgs e)
        {
            if (Encoding.UTF8.GetString(e.Message).Equals("RL1STAT_ON"))
            {
                updateStatusLabel("ON");
            }
            if (Encoding.UTF8.GetString(e.Message).Equals("RL1STAT_OFF"))
            {
                updateStatusLabel("OFF");
            }
        }

        void sendStatusRequest()
        {
            client.Publish(MQTT_TOPIC, // topic
            Encoding.UTF8.GetBytes("RL1STAT"), // message body
            MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, // QoS level
            true); // retained
        }

        void updateStatusLabel(String status)
        {
            ledRelayStatusLabel.Invoke(new MethodInvoker(delegate { ledRelayStatusLabel.Text = status; }));
        }

        private void ExitButton_Click(object sender, EventArgs e)
        {
            Environment.Exit(1);
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            Environment.Exit(1);
        }
    }
}
