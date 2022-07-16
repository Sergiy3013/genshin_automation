# Genshin Automation
## This tool will automatically collect Hoyolab daily login rewards.

Using this tool you can:
- Automate your rewards on the Hoyolab website.
- Export your gacha wish history of your account to an Excel file and upload it to Dropbox.

![Genshin Impact daily login rewards](/images/hoyolab/hoyolab-reward-list.png)

---

## How to use this tool?
**Fork this repository and you can move on to the next step.**

# Automatic collection of Hoyolab rewards for daily login
  
### 1) Receiving Your Account Cookies
  <details>
  <summary>Instruction</summary>

  1. I'm using Chrome browser, if you're using a different browser, some names may vary.
2. Open the **siteScript.js** file and copy its contents.
    ```
    var cookie=start();
    var ask=confirm('Cookie: '+cookie+'\n\nClick confirm to copy Cookie.');if(ask==true){copy(cookie);msg=cookie}else{msg='Cancel'}
    function start() {
        return "ltoken=" + getCookie("ltoken") + ";ltuid=" + getCookie("ltuid") + ";";
        function getCookie(name) {
            const value = ";" + document.cookie;
            const parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
    }
    ```
3. Go to https://www.hoyolab.com/genshin/ then login.
4. Right-click on the page and click on **View Code**, then click on the **Console** tab.
5. Paste the code you copied in the second paragraph and press **Enter**.
6. In the window that appears, click **Ok** and the necessary Cookies will be automatically copied to your clipboard. 
![Cookie copy window](/images/hoyolab/h-step-1.png)
</details>


### 2) Set up variables in GitHub
<details>
<summary>Instruction</summary>

1. Let's add Cookies to the variable, for this go to the following path in the cloned repository
**Settings** -> **Secrets**  -> **Actions**  -> **New repository secret**
![Path to add Cookies to repository variable](/images/hoyolab/github-1.png)
2. Enter a variable name and Cookies depending on what you want to set up your repository for. 
![Page for adding variables](/images/hoyolab/github-2.png)
In the first field you need to specify the name of the variable, in the second field Cookies. See examples below.

##### Example for one account
3. Variable name: `HOYOLAB_COOKIE`, Cookies example: `ltoken=t**************************************Q;ltuid=8******4;`
In this case, you just need to paste the text received in the `Getting Your Account Cookies` section.
  
**Please note, it is important to write Cookies on one line**
![Adding Cookies for One Account](/images/hoyolab/github-2.1.png)

##### Example for multiple accounts
3. Variable name: `HOYOLAB_COOKIES`, Cookies example: `["ltoken=a**************************************B;ltuid=1******2;","ltoken=c**************************************D;ltuid=3******4;","ltoken=e**************************************F;ltuid=5******6;"]`
In this case, you need to open square brackets `[` list received in the section `Getting your account's Cookies`, Cookies must be in double quotes `"`, separated by commas and then close square brackets `]`.
  
**Please note, it is important to write Cookies on one line**
![Adding Cookies for Multiple Accounts](/images/hoyolab/github-2.2.png)

###### Confirm variable creation
4. Click the **Add secret** button to add a variable.
</details>

### 3) Adding GitHub Actions
<details>
  <summary>Instruction</summary>

  Create an action that will be executed daily at 06:00 (UTC+8)
  **Actions** -> **Hoyolab Automation**  -> **Run workflow**  -> **Run workflow**
  ![Adding Actions](/images/hoyolab/github-3.png)
</details>


#### After that rewards will be collected automatically (**sometimes Cookies need to be updated**)

---

# Export wish history

### 1) Get a link with wish history
<details>
  <summary>PC Instruction</summary>

  1. Open Genshin Impact in this PC (If you use multiple accounts, please restart the game)
  2. Then open the wish history in the game and wait it to load
  3. Press START on your keyboard, then search for Powershell
  4. Click Windows Powershell, then copy & paste the script below to the Powershell
  ```
    iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/Sergiy3013/genshin_automation/master/getlink_global.ps1'))
  ```
  5. Press ENTER, and a link will copied to your clipboard.
</details>

<details>
  <summary>Android Instruction</summary>
  
  1. Open Wish (in the game)
  2. Press History
  3. Wait for it to load
  4. Turn off your Wi-Fi and data connection
  5. Press refresh on top right corner
  6. The page should display an error and show you some text with a black font
  7. Hold the text and press select all, then copy that text (don't copy only some portion of the text)
  8. Turn on your Wi-Fi or data connection
</details>

### 2) Create your own Dropbox app
<details>
  <summary>Instruction</summary>

  1. Follow this link: https://www.dropbox.com/lp/developers
  2. Click the `Create apps` button
  ![Create apps button](/images/dropbox/dropbox-1.png)
  3. Select everything as in the screenshot below and enter the name of your application in the `Name your app`
  ![Name your app](/images/dropbox/dropbox-2.png)
  4. Switch to the `Permissions` tab, select `files.content.write` and click `Submit`
  ![Permissions](/images/dropbox/dropbox-3.png)
  5. Switch to the `Settings` tab, in the field `Redirect URIs` (it's under `OAuth 2`
) enter `http://localhost/` and click `Add`.
  ![URI](/images/dropbox/dropbox-4.png)
  6. Click the `Generate` button (screenshot 1) and copy the resulting code (screenshot 2)
  ![Generate button](/images/dropbox/dropbox-5.png)
  Click on it with the left mouse button to select all the code and copy it
  ![resulting code](/images/dropbox/dropbox-6.png)
</details>

### 3) Set up variables in GitHub
<details>
  <summary>Instruction</summary>

  1. Go to the following path in your repository **Settings** -> **Secrets** -> **Actions** -> **New repository secret**
  ![Path to add Cookies to repository variable](/images/hoyolab/github-1.png)
  2. Enter the variable name (arrow 1) and desired data (arrow 2).
  ![Adding Actions](/images/hoyolab/github-2.png)
     - Add a variable named `AUTHKEY_URL` and the value you got in the `Get a link with wish history` paragraph
     - Add a variable named `DROPBOX_TOKEN` and the value you got in the `Create your own Dropbox app` paragraph
</details>

### 4) Adding GitHub Actions
<details>
  <summary>Instruction</summary>

  Create an action
  **Actions** -> **Run Wishxporter**  -> **Run workflow**  -> **Run workflow**
  ![Adding Actions](/images/dropbox/github-1.png)
</details>

#### After that, the tool will get the history of your desires and upload them to your Dropbox. (The AUTHKEY_URL variable needs to be updated about once a day)


