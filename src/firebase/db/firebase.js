// "use server"
// import { getFirestore } from "firebase-admin/firestore";
// // import { getDownloadURL, getStorage } from "firebase-admin/storage";
 
// export const getLinks = async () => {
//   const firestore = getFirestore();
//   const linkSnapshot = await firestore.collection("order").get();
//   const documents = linkSnapshot.docs.map((link) => ({
//     url: link.data().email,
//     title: link.data().phone,
//     desc: link.data().id,
//   }));
 
//   return documents;
// };
 
// export const getLogo = async () => {
//   const firestore = getFirestore();
//   const logoSnapshot = await firestore.collection("images").doc("logo").get();
//   const logoData = logoSnapshot.data() 
//   if (!logoSnapshot.exists || !logoData) {
//     return null;
//   }
//   return logoData.url;
// };
 
// export const getLogoFromStorage = async () => {
//   const bucket = getStorage().bucket();
//   const file = bucket.file("logo.png");
//   const imageUrl = await getDownloadURL(file);
//   console.log(imageUrl);
//   return imageUrl;
// };