import { createUploadthing, type FileRouter } from "uploadthing/server";
import { currentUser } from "@clerk/nextjs";

const f = createUploadthing();

const getUser = async () => await currentUser();

//File Router for your app, can contain multiple FileROutes
export const ourFileRouter = {
  //Define as many fileROutes as you like
  media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    //Set permissions and file types for this fileROute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await getUser();

      // Throw error so user does not upload
      if (!user) throw new Error("Unauthorized");

      //Else return and access on uploadThing
      return { userId: user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on your server after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
