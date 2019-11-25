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
            this.headerLabel = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.exitButton = new System.Windows.Forms.Button();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.bathOffButton = new System.Windows.Forms.Button();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.mainOffButton = new System.Windows.Forms.Button();
            this.label6 = new System.Windows.Forms.Label();
            this.mainLabel = new System.Windows.Forms.Label();
            this.mainOnButton = new System.Windows.Forms.Button();
            this.label4 = new System.Windows.Forms.Label();
            this.bathroomLabel = new System.Windows.Forms.Label();
            this.bathOnButton = new System.Windows.Forms.Button();
            this.groupBox4 = new System.Windows.Forms.GroupBox();
            this.lampOffButton = new System.Windows.Forms.Button();
            this.label5 = new System.Windows.Forms.Label();
            this.lampLabel = new System.Windows.Forms.Label();
            this.lampOnButton = new System.Windows.Forms.Button();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.label1 = new System.Windows.Forms.Label();
            this.groupBox3.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.groupBox4.SuspendLayout();
            this.groupBox1.SuspendLayout();
            this.SuspendLayout();
            // 
            // headerLabel
            // 
            this.headerLabel.AutoSize = true;
            this.headerLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 20F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.headerLabel.Location = new System.Drawing.Point(96, 30);
            this.headerLabel.Name = "headerLabel";
            this.headerLabel.Size = new System.Drawing.Size(608, 46);
            this.headerLabel.TabIndex = 1;
            this.headerLabel.Text = "PiDeviceNet Windows Interface";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.Location = new System.Drawing.Point(656, 535);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(133, 29);
            this.label2.TabIndex = 2;
            this.label2.Text = "2019 v1.1.0";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Microsoft Sans Serif", 8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label3.Location = new System.Drawing.Point(12, 544);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(226, 20);
            this.label3.TabIndex = 3;
            this.label3.Text = "Powered by MQTT and Node.js";
            // 
            // exitButton
            // 
            this.exitButton.Location = new System.Drawing.Point(336, 497);
            this.exitButton.Margin = new System.Windows.Forms.Padding(4);
            this.exitButton.Name = "exitButton";
            this.exitButton.Size = new System.Drawing.Size(125, 46);
            this.exitButton.TabIndex = 5;
            this.exitButton.Text = "Exit";
            this.exitButton.UseVisualStyleBackColor = true;
            this.exitButton.Click += new System.EventHandler(this.ExitButton_Click);
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.bathOffButton);
            this.groupBox3.Location = new System.Drawing.Point(251, 51);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(192, 293);
            this.groupBox3.TabIndex = 5;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "Bathroom  Door";
            // 
            // bathOffButton
            // 
            this.bathOffButton.Location = new System.Drawing.Point(29, 90);
            this.bathOffButton.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.bathOffButton.Name = "bathOffButton";
            this.bathOffButton.Size = new System.Drawing.Size(135, 53);
            this.bathOffButton.TabIndex = 1;
            this.bathOffButton.Text = "OFF";
            this.bathOffButton.UseVisualStyleBackColor = true;
            this.bathOffButton.Click += new System.EventHandler(this.bathOffButton_Click);
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.mainOffButton);
            this.groupBox2.Location = new System.Drawing.Point(36, 51);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(192, 293);
            this.groupBox2.TabIndex = 3;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Main Door";
            // 
            // mainOffButton
            // 
            this.mainOffButton.Location = new System.Drawing.Point(29, 90);
            this.mainOffButton.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.mainOffButton.Name = "mainOffButton";
            this.mainOffButton.Size = new System.Drawing.Size(135, 53);
            this.mainOffButton.TabIndex = 1;
            this.mainOffButton.Text = "OFF";
            this.mainOffButton.UseVisualStyleBackColor = true;
            this.mainOffButton.Click += new System.EventHandler(this.LedOffButton_Click);
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(83, 249);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(48, 16);
            this.label6.TabIndex = 4;
            this.label6.Text = "Status:";
            // 
            // mainLabel
            // 
            this.mainLabel.AutoSize = true;
            this.mainLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.mainLabel.Location = new System.Drawing.Point(80, 286);
            this.mainLabel.Name = "mainLabel";
            this.mainLabel.Size = new System.Drawing.Size(93, 32);
            this.mainLabel.TabIndex = 3;
            this.mainLabel.Text = "label5";
            // 
            // mainOnButton
            // 
            this.mainOnButton.Location = new System.Drawing.Point(65, 80);
            this.mainOnButton.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.mainOnButton.Name = "mainOnButton";
            this.mainOnButton.Size = new System.Drawing.Size(135, 54);
            this.mainOnButton.TabIndex = 0;
            this.mainOnButton.Text = "ON";
            this.mainOnButton.UseVisualStyleBackColor = true;
            this.mainOnButton.Click += new System.EventHandler(this.LedOnButton_Click);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(300, 249);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(48, 16);
            this.label4.TabIndex = 7;
            this.label4.Text = "Status:";
            // 
            // bathroomLabel
            // 
            this.bathroomLabel.AutoSize = true;
            this.bathroomLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 14F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.bathroomLabel.Location = new System.Drawing.Point(297, 286);
            this.bathroomLabel.Name = "bathroomLabel";
            this.bathroomLabel.Size = new System.Drawing.Size(93, 32);
            this.bathroomLabel.TabIndex = 6;
            this.bathroomLabel.Text = "label5";
            // 
            // bathOnButton
            // 
            this.bathOnButton.Location = new System.Drawing.Point(280, 80);
            this.bathOnButton.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.bathOnButton.Name = "bathOnButton";
            this.bathOnButton.Size = new System.Drawing.Size(135, 54);
            this.bathOnButton.TabIndex = 4;
            this.bathOnButton.Text = "ON";
            this.bathOnButton.UseVisualStyleBackColor = true;
            this.bathOnButton.Click += new System.EventHandler(this.bathOnButton_Click);
            // 
            // groupBox4
            // 
            this.groupBox4.Controls.Add(this.lampOffButton);
            this.groupBox4.Controls.Add(this.lampLabel);
            this.groupBox4.Location = new System.Drawing.Point(465, 51);
            this.groupBox4.Name = "groupBox4";
            this.groupBox4.Size = new System.Drawing.Size(192, 293);
            this.groupBox4.TabIndex = 9;
            this.groupBox4.TabStop = false;
            this.groupBox4.Text = "Lamp";
            // 
            // lampOffButton
            // 
            this.lampOffButton.Location = new System.Drawing.Point(29, 90);
            this.lampOffButton.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.lampOffButton.Name = "lampOffButton";
            this.lampOffButton.Size = new System.Drawing.Size(135, 53);
            this.lampOffButton.TabIndex = 1;
            this.lampOffButton.Text = "OFF";
            this.lampOffButton.UseVisualStyleBackColor = true;
            this.lampOffButton.Click += new System.EventHandler(this.lampOffButton_Click);
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(514, 249);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(48, 16);
            this.label5.TabIndex = 11;
            this.label5.Text = "Status:";
            // 
            // lampLabel
            // 
            this.lampLabel.AutoSize = true;
            this.lampLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lampLabel.Location = new System.Drawing.Point(25, 235);
            this.lampLabel.Name = "lampLabel";
            this.lampLabel.Size = new System.Drawing.Size(146, 20);
            this.lampLabel.TabIndex = 10;
            this.lampLabel.Text = "Not Supported Yet!";
            // 
            // lampOnButton
            // 
            this.lampOnButton.Location = new System.Drawing.Point(494, 80);
            this.lampOnButton.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.lampOnButton.Name = "lampOnButton";
            this.lampOnButton.Size = new System.Drawing.Size(135, 54);
            this.lampOnButton.TabIndex = 8;
            this.lampOnButton.Text = "ON";
            this.lampOnButton.UseVisualStyleBackColor = true;
            this.lampOnButton.Click += new System.EventHandler(this.lampOnButton_Click);
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.lampOnButton);
            this.groupBox1.Controls.Add(this.label5);
            this.groupBox1.Controls.Add(this.groupBox4);
            this.groupBox1.Controls.Add(this.bathOnButton);
            this.groupBox1.Controls.Add(this.bathroomLabel);
            this.groupBox1.Controls.Add(this.label4);
            this.groupBox1.Controls.Add(this.mainOnButton);
            this.groupBox1.Controls.Add(this.mainLabel);
            this.groupBox1.Controls.Add(this.label6);
            this.groupBox1.Controls.Add(this.groupBox2);
            this.groupBox1.Controls.Add(this.groupBox3);
            this.groupBox1.Location = new System.Drawing.Point(56, 90);
            this.groupBox1.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Padding = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.groupBox1.Size = new System.Drawing.Size(691, 382);
            this.groupBox1.TabIndex = 0;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Room Lighting Control";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(704, 497);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(85, 29);
            this.label1.TabIndex = 6;
            this.label1.Text = "Logan";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(801, 574);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.exitButton);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.headerLabel);
            this.Controls.Add(this.groupBox1);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.Name = "Form1";
            this.Text = "PiDevNet Commander";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.groupBox3.ResumeLayout(false);
            this.groupBox2.ResumeLayout(false);
            this.groupBox4.ResumeLayout(false);
            this.groupBox4.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.Label headerLabel;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Button exitButton;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.Button bathOffButton;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Button mainOffButton;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label mainLabel;
        private System.Windows.Forms.Button mainOnButton;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label bathroomLabel;
        private System.Windows.Forms.Button bathOnButton;
        private System.Windows.Forms.GroupBox groupBox4;
        private System.Windows.Forms.Button lampOffButton;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label lampLabel;
        private System.Windows.Forms.Button lampOnButton;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Label label1;
    }
}

