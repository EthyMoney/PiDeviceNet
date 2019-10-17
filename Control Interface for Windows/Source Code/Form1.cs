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
        MqttClient client;
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
          client.Publish("459123459", // topic
          Encoding.UTF8.GetBytes("RL1ON"), // message body
          MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, // QoS level
          true); // retained
          sendStatusRequest();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            label5.Text = " ";
            client = new MqttClient("test.mosquitto.org");
            byte code = client.Connect(Guid.NewGuid().ToString());

            client.Publish("459123459", // topic
            Encoding.UTF8.GetBytes("Windows Commander Interface is online!"), // message body
            MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, // QoS level
            true); // retained

            client.Subscribe(new string[] {"459123459"},
                 new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE});
            
            client.MqttMsgPublishReceived += client_MqttMsgPublishReceived; // Add event handler
        }

        private void button2_Click(object sender, EventArgs e)
        {
            client.Publish("459123459", // topic
            Encoding.UTF8.GetBytes("RL1OFF"), // message body
            MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, // QoS level
            true); // retained
            sendStatusRequest();
        }

        private void button3_Click(object sender, EventArgs e)
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
            client.Publish("459123459", // topic
            Encoding.UTF8.GetBytes("RL1STAT"), // message body
            MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, // QoS level
            true); // retained
        }

        void updateStatusLabel(String status)
        {
            label5.Invoke(new MethodInvoker(delegate { label5.Text = status; }));
        }

        private void button4_Click(object sender, EventArgs e)
        {
            Environment.Exit(1);
        }
    }
}
