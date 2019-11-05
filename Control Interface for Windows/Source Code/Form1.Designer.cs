namespace RoomCommander
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.label6 = new System.Windows.Forms.Label();
            this.ledRelayStatusLabel = new System.Windows.Forms.Label();
            this.getStatusButton = new System.Windows.Forms.Button();
            this.ledOffButton = new System.Windows.Forms.Button();
            this.ledOnButton = new System.Windows.Forms.Button();
            this.headerLabel = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.exitButton = new System.Windows.Forms.Button();
            this.groupBox1.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.label6);
            this.groupBox1.Controls.Add(this.ledRelayStatusLabel);
            this.groupBox1.Controls.Add(this.getStatusButton);
            this.groupBox1.Controls.Add(this.ledOffButton);
            this.groupBox1.Controls.Add(this.ledOnButton);
            this.groupBox1.Location = new System.Drawing.Point(130, 102);
            this.groupBox1.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Padding = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.groupBox1.Size = new System.Drawing.Size(483, 288);
            this.groupBox1.TabIndex = 0;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "LED Lighting Control";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(267, 174);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(99, 20);
            this.label6.TabIndex = 4;
            this.label6.Text = "Light Status:";
            // 
            // ledRelayStatusLabel
            // 
            this.ledRelayStatusLabel.AutoSize = true;
            this.ledRelayStatusLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ledRelayStatusLabel.Location = new System.Drawing.Point(262, 209);
            this.ledRelayStatusLabel.Name = "ledRelayStatusLabel";
            this.ledRelayStatusLabel.Size = new System.Drawing.Size(93, 32);
            this.ledRelayStatusLabel.TabIndex = 3;
            this.ledRelayStatusLabel.Text = "label5";
            // 
            // getStatusButton
            // 
            this.getStatusButton.Location = new System.Drawing.Point(292, 55);
            this.getStatusButton.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.getStatusButton.Name = "getStatusButton";
            this.getStatusButton.Size = new System.Drawing.Size(152, 82);
            this.getStatusButton.TabIndex = 2;
            this.getStatusButton.Text = "GET STATUS";
            this.getStatusButton.UseVisualStyleBackColor = true;
            this.getStatusButton.Click += new System.EventHandler(this.GetLedStatusButton_Click);
            // 
            // ledOffButton
            // 
            this.ledOffButton.Location = new System.Drawing.Point(40, 158);
            this.ledOffButton.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.ledOffButton.Name = "ledOffButton";
            this.ledOffButton.Size = new System.Drawing.Size(152, 82);
            this.ledOffButton.TabIndex = 1;
            this.ledOffButton.Text = "LED OFF";
            this.ledOffButton.UseVisualStyleBackColor = true;
            this.ledOffButton.Click += new System.EventHandler(this.LedOffButton_Click);
            // 
            // ledOnButton
            // 
            this.ledOnButton.Location = new System.Drawing.Point(40, 55);
            this.ledOnButton.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.ledOnButton.Name = "ledOnButton";
            this.ledOnButton.Size = new System.Drawing.Size(152, 82);
            this.ledOnButton.TabIndex = 0;
            this.ledOnButton.Text = "LED ON";
            this.ledOnButton.UseVisualStyleBackColor = true;
            this.ledOnButton.Click += new System.EventHandler(this.LedOnButton_Click);
            // 
            // headerLabel
            // 
            this.headerLabel.AutoSize = true;
            this.headerLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 20F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.headerLabel.Location = new System.Drawing.Point(70, 22);
            this.headerLabel.Name = "headerLabel";
            this.headerLabel.Size = new System.Drawing.Size(608, 46);
            this.headerLabel.TabIndex = 1;
            this.headerLabel.Text = "PiDeviceNet Windows Interface";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.Location = new System.Drawing.Point(592, 484);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(133, 29);
            this.label2.TabIndex = 2;
            this.label2.Text = "2019 v1.0.0";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(309, 496);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(138, 20);
            this.label3.TabIndex = 3;
            this.label3.Text = "Powered by MQTT";
            // 
            // exitButton
            // 
            this.exitButton.Location = new System.Drawing.Point(306, 418);
            this.exitButton.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.exitButton.Name = "exitButton";
            this.exitButton.Size = new System.Drawing.Size(141, 58);
            this.exitButton.TabIndex = 5;
            this.exitButton.Text = "Exit";
            this.exitButton.UseVisualStyleBackColor = true;
            this.exitButton.Click += new System.EventHandler(this.ExitButton_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(9F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(755, 528);
            this.Controls.Add(this.exitButton);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.headerLabel);
            this.Controls.Add(this.groupBox1);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.Name = "Form1";
            this.Text = "PiDevNet - Commander  v1.0.0";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Label headerLabel;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label ledRelayStatusLabel;
        private System.Windows.Forms.Button getStatusButton;
        private System.Windows.Forms.Button ledOffButton;
        private System.Windows.Forms.Button ledOnButton;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Button exitButton;
    }
}

