export const typeDefs = `#graphql
   type Query {
     hello: String
     getDataFromFirestore: String
     getAllPatients: [Patient]
     getAllFiles(patientId: ID!): [FileWithPatient]
     getComments(fileId: ID!): [Comment]
   }

 type User {
  id: ID!
   name: String!
   email: String!
   password:String!
   position:String!
 }

 type Comment {
    id: ID!
    text: String!
    fileId: ID!
    datePosted:String!
  }

  type Patient {
    id: ID!
    firstname: String!
    lastname: String!
  }

  type File{
    id: ID!
    url:String!
    name:String!
    comments:[Comment]
    patient: Patient
  }

  type FileWithPatient {
  id: ID!
  url: String!
  name: String!
  comments: [Comment]
  patient: Patient
}

 type Mutation {
  loginUser(email: String!, password: String!): User
     createUser(name: String!, email: String!, password: String!, position: String!): User
     addComment(text: String!, fileId: ID!,datePosted:String!): Comment
     deleteComment(id: ID!): Comment
     updateComment(id: ID!, text: String!,datePosted:String!): Comment
     addPatient(firstname: String!, lastname: String!): Patient
     addFile(id: ID!, url: String!):File
}

`;