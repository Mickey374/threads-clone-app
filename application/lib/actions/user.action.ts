"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

//Function to Update user
export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      {
        id: userId,
      },
      { username: username.toLowerCase(), name, bio, image, onboarded: true },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

//Function to Fetch user
export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User
      .findOne({ id: userId })
      // .populate({
      //   path: "communities",
      //   model: "Community",
      // });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
   }
}

//Function to Fetch User Specific Threads
export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();

    //TODO Populate Community

    const threads = await User.findOne({id: userId})
      .populate({
        path: 'threads',
        model: Thread,
        populate: {
          path: 'children',
          model: Thread,
          populate: {
            path: 'author',
            model: 'User',
            select: 'name image id'
          }
        }
      })

      return threads;
  } catch (error: any) {
    throw new Error(`Error fetching User Specific Threads: ${error.message}`);
  }
}