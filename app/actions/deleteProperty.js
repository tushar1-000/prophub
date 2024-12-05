"use server";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();

  // Check for session
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  await connectDB();

  const property = await Property.findById(propertyId).lean();

  if (!property) throw new Error("Property Not Found");

  // Verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  // // extract public id's from image url in DB
  // const publicIds = property.images.map((imageUrl) => {
  //   const parts = imageUrl.split("/");
  //   return parts.at(-1).split(".").at(0);
  // });

  // // Delete images from Cloudinary
  // if (publicIds.length > 0) {
  //   for (let publicId of publicIds) {
  //     await cloudinary.uploader.destroy("prophub/" + publicId);
  //   }
  // }

  // // Proceed with property deletion
  // await property.deleteOne();

  // Parallel processing of image deletion and property removal
  await Promise.all([
    // Batch delete Cloudinary images
    cloudinary.api.delete_resources(
      property.images.map((imageUrl) => {
        const parts = imageUrl.split("/");
        return "prophub/" + parts.at(-1).split(".").at(0);
      }),
      { type: "upload", resource_type: "image" }
    ),
    // Delete property from database
    Property.findByIdAndDelete(propertyId),
  ]);

  revalidatePath("/", "layout");
}

export default deleteProperty;
