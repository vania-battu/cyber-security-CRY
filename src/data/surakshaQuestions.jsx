export const surakshaLevels = [
    {
        id: 1,
        title: "The Gateway Guard (Account Hacking & Safe Browsing)",
        guruTip: "Not everything free is safe! 4.6% of students lose control of their accounts because they click on 'magic' links without thinking. Always look for the lock icon in your browser!",
        villain: "Captain Hack",
        bossBrief: "A strong lock is useless if you leave the key under the mat! Hackers don't just 'guess'; they use software to try thousands of combinations. Let's see if your shield is thick enough.",
        questions: [
            {
                scenario: "You want to make a password that is easy to remember but impossible to hack. Which strategy is the best?",
                options: [
                    "Use your nickname and your birth year (e.g., Chintu2012).",
                    "Use the name of your favorite movie or cricketer (e.g., Avengers).",
                    "Pick three random words and a symbol (e.g., BlueMango#Tree).",
                    "Use your school's name and roll number."
                ],
                correctIndex: 2,
                fact: "Random word strings are harder for 'Brute Force' software to crack."
            },
            {
                scenario: "You are using a computer at a public library or an internet cafe. What is the most important thing to do before leaving?",
                options: [
                    "Just close all the tabs in the browser.",
                    "Use 'Incognito Mode' and also click 'Log Out' on every site.",
                    "Clear the browser history so no one knows what you watched.",
                    "Ask the manager to delete your files."
                ],
                correctIndex: 1,
                fact: "Closing tabs doesn't always end the session; logging out is vital."
            },
            {
                scenario: "You get a message: 'Your account was logged in from a different city. If this wasn't you, click here to secure it.' What do you do?",
                options: [
                    "Click the link immediately to stop the hacker.",
                    "Delete the message; it's probably a mistake.",
                    "Close the message, go to the app/website manually, and change your password there.",
                    "Reply to the message asking 'Who is this?'"
                ],
                correctIndex: 2,
                fact: "The message itself might be a 'phishing' trap; always go to the source."
            },
            {
                scenario: "Your cousin asks to borrow your tablet to play a game. Your social media and email are already logged in.",
                options: [
                    "Let them use it; they are family and won't do anything wrong.",
                    "Set up a 'Guest' profile or lock your important apps with a PIN first.",
                    "Watch over their shoulder the whole time they are playing.",
                    "Tell them they can only play for 10 minutes."
                ],
                correctIndex: 1,
                fact: "Technical boundaries are safer than just 'watching' someone."
            },
            {
                scenario: "You find a cool 'Password Manager' app that is free and has no reviews. Should you use it?",
                options: [
                    "Yes, it will help me keep my passwords safe.",
                    "No, unknown apps can actually steal the passwords you type into them.",
                    "Yes, if it looks professional and has a nice logo.",
                    "Only if my friends are also using it."
                ],
                correctIndex: 1,
                fact: "Fake security apps are a common way hackers steal data."
            }
        ]
    },
    {
        id: 2,
        title: "Phisher (Identity Theft & Phishing)",
        guruTip: "Banks and the government never ask for passwords or PINs over WhatsApp or SMS. This is called 'Phishing'—fishing for your secrets!",
        villain: "The Phish Master",
        bossBrief: "I've cast my line into the digital ocean, and many children are biting! Can you spot the difference between a real message and my clever traps?",
        questions: [
            {
                scenario: `You get a WhatsApp message from an unknown number using your friend's photo as the profile picture. The message says: "I'm in trouble! Please send me the OTP sent to your phone." What should you do?`,
                options: [
                    "Send the OTP quickly to help your friend.",
                    "Reply and ask why they need the OTP.",
                    "Call your friend on their real number first to check if it’s really them.",
                    "Share only part of the OTP."
                ],
                correctIndex: 2,
                fact: "Verification outside the chat is the only way to beat 'Impersonation Phishing'."
            },
            {
                scenario: "A website for a popular game offers 'Double Coins' if you login with your Facebook or Google account.",
                options: [
                    "Check if the URL is exactly correct (e.g., www.realgame.com not www.real-game-free.com).",
                    "Use a fake email address to try it out first.",
                    "Go ahead; many games use Facebook to login.",
                    "Only do it if the 'Secure' padlock icon is visible."
                ],
                correctIndex: 0,
                fact: "Checking for 'look-alike' URLs is the most advanced way to spot phishing."
            },
            {
                scenario: "You receive an SMS: 'Your father's electricity bill is unpaid. Pay now at this link or the lights will go off tonight.'",
                options: [
                    "Pay it quickly using your saved pocket money.",
                    "Forward the link to your father so he can pay it.",
                    "Don't click; tell your parents that it might be a scam.",
                    "Click to see how much the bill is first."
                ],
                correctIndex: 2,
                fact: "Scammers use 'Urgency' and 'Fear' to make people click without thinking."
            },
            {
                scenario: "You are playing Free Fire/BGMI and see a link saying: ‘Get free diamonds instantly! Download this app now!’ What should you do?",
                options: [
                    "Download it quickly — many gamers use it.",
                    "Avoid downloading it — such apps can steal your data or hack your device.",
                    "Download it first and delete it later if it looks suspicious.",
                    "Ask your friend to try it before you use it."
                ],
                correctIndex: 1,
                fact: "Third-party software 'bundles' are the #1 way to get malware."
            },
            {
                scenario: "What is a 'Digital Footprint'?",
                options: [
                    "The password you use to get into your phone.",
                    "The record of everything you do, search, and post online.",
                    "A secret code that hackers use to find your house.",
                    "The speed of your internet connection."
                ],
                correctIndex: 1,
                fact: "Understanding that everything leaves a trail helps children be more careful."
            }
        ]
    },
    {
        id: 3,
        title: "The Shadow Bully (Cyberbullying & Reporting)",
        guruTip: `10% of teenagers experience cyberbullying. Girls report it more often, but boys should also know that reporting is a sign of strength, not weakness!
Being cyber-smart means standing up to online bullying. Block, report, save evidence, and reach out to someone you trust—help is always available.`,
        villain: "Shadow Bully",
        bossBrief: "The shadows are a perfect place to hide mean words. I make others feel small while hiding behind a screen. Can you shine the light on cyberbullying?",
        questions: [
            {
                scenario: "Which of these is an example of cyberbullying?",
                options: [
                    "Disagreeing with someone in a group chat",
                    "Sharing a funny meme with friends",
                    "Posting someone’s embarrassing photo without their permission to make others laugh",
                    "Blocking someone you don’t know"
                ],
                correctIndex: 2,
                fact: "Cyberbullying involves intentional harm through digital platforms."
            },
            {
                scenario: "If someone sends you mean or threatening messages online, what should you do FIRST?",
                options: [
                    "Reply with something mean",
                    "Share it with everyone",
                    "Delete your account immediately",
                    "Save evidence and tell a trusted adult"
                ],
                correctIndex: 3,
                fact: "Saving evidence is crucial for reporting and taking action."
            },
            {
                scenario: "Your friend asks you to forward a rumour about a classmate. What is the safest choice?",
                options: [
                    "Forward it quickly",
                    "Ask others if it’s true",
                    "Ignore it and don’t spread it",
                    "Post it anonymously"
                ],
                correctIndex: 2,
                fact: "Stopping the spread of rumours is a powerful way to end bullying."
            },
            {
                scenario: "Cyberbullying only happens between strangers.",
                options: [
                    "True - strangers are the only ones who bully online",
                    "False - it can happen between friends, classmates, or strangers",
                    "Only in online games",
                    "Only if someone shares their password"
                ],
                correctIndex: 1,
                fact: "Cyberbullying can happen between friends, classmates, or strangers."
            },
            {
                scenario: "You see someone being bullied in an online game chat. What can you do?",
                options: [
                    "Report the bully and support the person being targeted",
                    "Watch quietly",
                    "Join the teasing",
                    "Leave the game"
                ],
                correctIndex: 0,
                fact: "Being an 'Upstander' stops bullying faster than being a bystander."
            }
        ]
    },
    {
        id: 4,
        title: "The Fake Friend (Cyber Grooming & Social Risks)",
        guruTip: "Groomers try to be your 'best friend' to get photos or information. 63% of safe users only connect with people they have met in real life!",
        villain: "The Deceiver",
        bossBrief: "I can be whoever you want me to be. A friend, a classmate, a fellow gamer. Can you see through my digital mask?",
        questions: [
            {
                scenario: "An online friend asks you to 'keep a secret' from your parents about your chats. Is this okay?",
                options: [
                    "Yes, friends have secrets, and privacy is important for teenagers.",
                    "No! Healthy friendships don’t require hiding things from parents; this is a major red flag for grooming.",
                    "It’s fine as long as you aren’t doing anything illegal or dangerous.",
                    "Yes, but only if you have known them for more than six months and trust them."
                ],
                correctIndex: 1,
                fact: "Healthy friendships don't require hiding things from parents."
            },
            {
                scenario: "A stranger online says, 'I am 14 years old like you,' but they refuse to video call or show their face.",
                options: [
                    "Believe them; many people are just camera-shy or have 'social anxiety' online.",
                    "Ask them to send a static photo instead; if the photo looks real, they are telling the truth.",
                    "Be careful; people can easily lie about their age, and 'catfishing' is a common way to gain trust.",
                    "Assume they are a celebrity or someone famous who needs to keep their identity a secret."
                ],
                correctIndex: 2,
                fact: "People can easily lie about their age online."
            },
            {
                scenario: "Someone you met online asks to meet you at a mall alone. What do you do?",
                options: [
                    "Go, but stay in a crowded area and share your 'Live Location' with a friend.",
                    "Video call them first to prove who they are; if they look like their profile, it’s safe to meet.",
                    "Agree to meet, but bring a pocket knife or pepper spray just in case something goes wrong.",
                    "Never go alone. If you must meet, tell a parent and have them accompany you the entire time."
                ],
                correctIndex: 3,
                fact: "Never meet an online friend alone."
            },
            {
                scenario: "What should you never share with a 'game friend' or online contact?",
                options: [
                    "Sensitive data like your home address, school name, or current location.",
                    "Your favorite game character or your 'main' strategy.",
                    "Your first name, since many people have the same first name anyway.",
                    "Your general city or state, as long as you don't give the specific street address."
                ],
                correctIndex: 0,
                fact: "Never share sensitive personal info like address or phone number."
            },
            {
                scenario: "You accidentally saw an 'adult' or scary video online. What should you do?",
                options: [
                    "Keep watching to see if it gets better or to understand what it is.",
                    "Just close the tab and try to forget about it; telling an adult might get you in trouble.",
                    "Close the tab immediately and tell a trusted adult so they can help you report or block it.",
                    "Clear your browser history so your parents don't think you were looking for it on purpose."
                ],
                correctIndex: 2,
                fact: "Always tell an adult if you see something uncomfortable online."
            }
        ]
    },
    {
        id: 5,
        title: "The Final Arena (Online Game Risks & Mastery)",
        guruTip: "Gaming addiction affects 48% of teens. If you feel angry when you are offline, it’s time to take a break! Gaming is a world of its own, but it has real-world costs. 44% of kids feel angry when they are offline—don't let the game control your mood.",
        villain: "Master Lag",
        bossBrief: "The game is the only thing that matters. Why stop when you can play forever? Let's see if you can balance the virtual world with reality.",
        questions: [
            {
                scenario: "You find a way to get 'Unlimited Gems' by using a 'Cheat Tool' that asks for your phone’s IMEI number or Device ID.",
                options: [
                    "Give the ID; it's not a password, so it's safe.",
                    "Don't give it; Device IDs can be used to track or ban your phone permanently.",
                    "Only give it if the website has good ratings.",
                    "Use your friend's Device ID instead."
                ],
                correctIndex: 1,
                fact: "Hardware IDs are sensitive data used for tracking and blocking."
            },
            {
                scenario: "You are playing a game and someone is 'Trash Talking' (saying very bad things) to you.",
                options: [
                    "Talk back even harder to show them you aren't weak.",
                    "Quit the game and don't play for a week.",
                    "Try to find their real name to report them to their school.",
                    "Use the 'Mute' button and continue your game in peace."
                ],
                correctIndex: 3,
                fact: "Muting is the most effective immediate way to handle 'Toxic Gaming'."
            },
            {
                scenario: "A game is 'Free to Play' but it keeps showing you pop-ups to buy 'Loot Boxes' to progress.",
                options: [
                    "Set a strict 'time and money' limit for yourself before you start.",
                    "Keep buying them; it's the only way to win.",
                    "Find a hacked version of the game to get the boxes for free.",
                    "Ask your parents for their credit card just 'for one time.'"
                ],
                correctIndex: 0,
                fact: "Self-regulation is the key to avoiding 'Problematic Internet Use'."
            },
            {
                scenario: "You’ve been playing a game for 5 hours straight. You feel a headache and you've skipped lunch.",
                options: [
                    "Drink an energy drink and keep going; you're almost at the top.",
                    "Save the game, do 10 jumping jacks, and eat a meal.",
                    "Lower the brightness so your eyes hurt less.",
                    "Play for just one more hour and then stop."
                ],
                correctIndex: 1,
                fact: "Physical health is directly linked to safe gaming habits."
            },
            {
                scenario: "Which of these is a sign of 'Internet Addiction'?",
                options: [
                    "Feeling very angry or sad when the Wi-Fi goes off.",
                    "Preferring to play games instead of meeting friends in person.",
                    "Thinking about the game even when you are in class.",
                    "All of the above."
                ],
                correctIndex: 3,
                fact: "Internet addiction involves anticipation, lack of control, and real-life interference."
            }
        ]
    }
];
