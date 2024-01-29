## Quick Start

Please fork this repository and then email the final github repository url to dhaval@sentryhealth.ca when the assignment is completed.

Feel free to interpret the instructions in any way you want. They are intentionally left open to allow for freedom in how the assignment is completed. Looking forward to seeing what creative solutions are submitted.

## Patient File Manager Assignment:

As a clinic assistant, I aim to facilitate the efficient management of patient files, allowing doctors to seamlessly reference files and associated comments during appointments.

## Tech Stack:

1. **Backend:**
   - GraphQL API utilizing Apollo Server on an Express server.
   - Integration with Google Firebase.

2. **Client:**
   - VueJS.
   - Nuxt

## Supplementary documentation:

1. https://firebase.google.com/docs/admin/setup
2. https://www.apollographql.com/docs/apollo-server/getting-started/
3. https://expressjs.com/en/starter/hello-world.html
4. https://vuejs.org/guide/quick-start
5. https://nuxt.com/docs/getting-started/installation


## Required Features:

### File Upload:
1. **Assistant Functionality:**
   - Enable assistants to upload files on behalf of patients.

   ![assistant](docs/assistant-upload-file.gif)
   ![assistant](docs/upload-file2.gif)

### Comment Management:
1. **Assistant Capability:**
   - Allow assistants to create, read, or delete comments on patient files.
  
      Create

![add](docs/add-comment.gif)

      Update

![update](docs/edit-comment.gif)

      Delete
  
![delete](docs/delete-comment.gif)

   - Allow assistants to view comments in chronological order.
  
      Sort 

![sort](docs/sort.gif)

1. **Doctor Capability:**
   - Enable doctors to perform similar actions on patient files' comments.

![restriction](docs/uploading-restricted-to-assistant.gif)

### Patient Management:
1. **Unique Identification:**
   - Should be able to uniquely determine the patient of a file.
     - After uploading a file into a patient's dashboard system identifies the patient's name 
![dashboard](docs/a-patient-dashboard.gif)

## Optional Requirements:

### Authentication/Authorization:
1. **Access Control:**
   - Consider implementing authentication and authorization mechanisms to regulate access and enhance data security.

### Auditing:
1. **User Tracking:**
   - Provide the ability to track users who have viewed patient files.

### Automated Testing:
1. **Reliability Assurance:**
   - Implement automated testing procedures to guarantee the reliability and correctness of file management and comment features.

### Differentiating Features:
1. **Innovative Functionality:**
   - Introduce any additional features that you believe would distinguish our Patient File Manager.

*Note: The optional features aim to enhance security, traceability, and reliability in the system, while the call for differentiating features encourages creativity and innovation.*
