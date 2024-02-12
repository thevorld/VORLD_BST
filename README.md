<!-- @format -->

Welcome to our VORLD backend server template project! This open-source repository is designed to kickstart your back-end server deployment with a focus on security, logging, and seamless deployment capabilities. Aimed at developers looking to integrate advanced features like custom user creation, and Solana blockchain technology for the integration of tokens, NFTs, and cNFTs into their applications, this template serves as a robust starting point, saving you time and effort in setting up your project infrastructure.

**Features**
Security: Pre-configured security settings to safeguard your application.
Logging: Integrated logging mechanisms for efficient monitoring and debugging.
Deployment: Ready-to-use GitHub action files for easy deployment to cloud-run environments.
Environment Variables: Simple configuration through environment variables for customizing your server.
API Integration: Flexibility to add your favourite APIs seamlessly.
Upcoming Features: Custom user creation and Solana integration for building next-gen applications.

**Getting Started**

**Prerequisites**
Git
Node.js and npm/yarn
Access to a Cloud Run service

**Installation**
Clone the repository:
bash
Copy code
git clone [repository-url]
Navigate to the project directory:
bash
Copy code
cd [project-name]

Install dependencies:
bash
Copy code
npm install
or if you use yarn:
bash
Copy code
yarn install
Configure your environment variables in the .env file according to the env.example provided.

if you are on windows update package.json
"dev": "nodemon --watch \"src/\*_/_.ts\" --exec \"node_modules/.bin/ts-node\" src/app.ts"

Deployment
Follow the steps in the GitHub Actions file .github/workflows/main.yml to set up your CI/CD pipeline for deployment to Cloud Run.

Contributing
We welcome contributions! Whether it's submitting bugs, requesting features, or contributing code, your input is valuable to making this project better for everyone. Please read through our CONTRIBUTING.md file for guidelines on how to contribute.

Support
If you encounter any issues or have questions, please file an issue on GitHub. Our team is dedicated to providing support and answering any questions you might have.

License
This project is open source and available under the MIT License. Any expert contributions to making it much better and battle-tested is highly appreciated.

Acknowledgements
Our community of developers, people from the Solana Foundation, the superteam and contributors for their ongoing support.

**Full Changelog**: https://github.com/thevorld/VORLD_BST/commits/BST-1.0.0
