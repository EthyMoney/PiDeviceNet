using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
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



            // To-Do:

            // Add combo buttons to control groups or all devices at once.
            // Add status check for lamp via wemo!








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
            mainLabel.Text = " ";
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
            sendStatusRequest2();
        }

        private void LedOffButton_Click(object sender, EventArgs e)
        {
            client.Publish(MQTT_TOPIC, // topic
            Encoding.UTF8.GetBytes("RL1OFF"), // message body
            MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, // QoS level
            true); // retained
            sendStatusRequest();
        }

        // No status button at this time. It will be back!
        private void GetLedStatusButton_Click(object sender, EventArgs e)
        {
            sendStatusRequest();
            sendStatusRequest2();
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
            if (Encoding.UTF8.GetString(e.Message).Equals("RL2STAT_ON"))
            {
                updateStatusLabel2("ON");
            }
            if (Encoding.UTF8.GetString(e.Message).Equals("RL2STAT_OFF"))
            {
                updateStatusLabel2("OFF");
            }
            // Need to add status check for lamp from wemo here
        }

        void sendStatusRequest()
        {
            client.Publish(MQTT_TOPIC, // topic
            Encoding.UTF8.GetBytes("RL1STAT"), // message body
            MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, // QoS level
            true); // retained
        }
        void sendStatusRequest2()
        {
            client.Publish(MQTT_TOPIC, // topic
                Encoding.UTF8.GetBytes("RL2STAT"), // message body
                MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, // QoS level
                true); // retained
        }

        void updateStatusLabel(String status)
        {
            mainLabel.Invoke(new MethodInvoker(delegate { mainLabel.Text = status; }));
            /*
            if (status == "ON")
            {
                pictureBox1.Image = Image.FromFile("C:\\Users\\ultim\\Documents\\Projects\\PiDeviceNet\\Control Interface for Windows\\Source Code\\Icons\\on.png");
            }

            if (status == "OFF")
            {
                pictureBox1.Image = Image.FromFile("C:\\Users\\ultim\\Documents\\Projects\\PiDeviceNet\\Control Interface for Windows\\Source Code\\Icons\\off.png");
            }*/
        }

        void updateStatusLabel2(String status)
        {
            mainLabel.Invoke(new MethodInvoker(delegate { bathroomLabel.Text = status; }));
            /*
            if (status == "ON")
            {
                pictureBox2.Image = Image.FromFile("C:\\Users\\ultim\\Documents\\Projects\\PiDeviceNet\\Control Interface for Windows\\Source Code\\Icons\\on.png");
            }

            if (status == "OFF")
            {
                pictureBox2.Image = Image.FromFile("C:\\Users\\ultim\\Documents\\Projects\\PiDeviceNet\\Control Interface for Windows\\Source Code\\Icons\\off.png");
            }
            */
        }


        private void ExitButton_Click(object sender, EventArgs e)
        {
            Environment.Exit(1);
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            Environment.Exit(1);
        }

        private void bathOnButton_Click(object sender, EventArgs e)
        {
            client.Publish(MQTT_TOPIC, // topic
                Encoding.UTF8.GetBytes("RL2ON"), // message body
                MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, // QoS level
                true); // retained
            sendStatusRequest2();
        }

        private void bathOffButton_Click(object sender, EventArgs e)
        {
            client.Publish(MQTT_TOPIC, // topic
                Encoding.UTF8.GetBytes("RL2OFF"), // message body
                MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, // QoS level
                true); // retained
            sendStatusRequest2();
        }

        private void lampOnButton_Click(object sender, EventArgs e)
        {
            // Execute external node.js script for wemo control of lamp
            Process p = new Process();
            p.StartInfo.UseShellExecute = false;
            p.StartInfo.RedirectStandardOutput = true;
            p.StartInfo.RedirectStandardError = true;
            p.StartInfo.RedirectStandardInput = true;
            p.StartInfo.FileName = @"C:\Windows\System32\cmd.exe"; //Path to cmd
            p.StartInfo.WorkingDirectory = @"C:\\Users\\ultim\\Documents\\Projects\\wemo-control";
            p.StartInfo.Arguments = @"/c node lamp_on.js";
            p.StartInfo.CreateNoWindow = true;
            p.Start();
        }

        private void lampOffButton_Click(object sender, EventArgs e)
        {
            // Execute external node.js script for wemo control of lamp
            Process p = new Process();
            p.StartInfo.UseShellExecute = false;
            p.StartInfo.RedirectStandardOutput = true;
            p.StartInfo.RedirectStandardError = true;
            p.StartInfo.RedirectStandardInput = true;
            p.StartInfo.FileName = @"C:\Windows\System32\cmd.exe"; //Path to cmd
            p.StartInfo.WorkingDirectory = @"C:\\Users\\ultim\\Documents\\Projects\\wemo-control";
            p.StartInfo.Arguments = @"/c node lamp_off.js";
            p.StartInfo.CreateNoWindow = true;
            p.Start();
        }
    }
}
