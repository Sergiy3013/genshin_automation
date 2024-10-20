[UA](README_UA.md) | [ENG](README.md)

***

# Genshin Automation
## This tool will automatically collect Hoyolab daily login rewards.

Unfortunately, due to a violation of GitHub's terms, this automation tool cannot be published here. Due to many forks and activity it was removed twice, but I still support it and it still works. 
If you want to use it, you can join our [Discord](https://discordapp.com/users/237628352914128897/) where there is a bot with an automation script. Ping me if you have any questions (@call_me_noname)
---

![Genshin Impact daily login rewards](/images/hoyolab/hoyolab-reward-list.png)

---

## How to use this tool?
**Fork this repository and you can move on to the next step.**

# Automatic collection of Hoyolab rewards for daily login
  
### 1) Receiving Your Account Cookies
  <details>
  <summary>Instruction</summary>

  1. I'm using Chrome browser, if you're using a different browser, some names may vary.
2. Open the `siteScript.js` file and copy its contents.
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
