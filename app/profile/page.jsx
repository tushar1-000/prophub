import React from "react";
import Image from "next/image";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import profileDefalut from "@/assets/images/profile.png";
import ProfileProperties from "@/components/ProfileProperties";
import { convertToSerializeableObject } from "@/utils/convertToObject";

async function Profile() {
    await connectDB()
  const sessionUser = await getSessionUser();
const {userId} =  sessionUser
  if(!sessionUser.userId){
    throw new Error('User id is not present')
  }

  const propertiesDocs = await Property.find({owner: userId}).lean()
  let properties =  propertiesDocs.map(convertToSerializeableObject)
  
  
  return (
    <div>
      <section className="bg-blue-50">
        <div className="container m-auto py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mx-20 mt-10">
                <div className="mb-4">
                  <Image
                    className="h-20 w-20 md:h-20 md:w-20 rounded-full mx-auto md:mx-0"
                    src={sessionUser.user.image || profileDefalut}
                    alt="User"
                    width={50}
                    height={50}
                  />
                </div>
                <h2 className="text-2xl mb-4">
                  <span className="font-bold block">Name: </span> {sessionUser.user.name}
                </h2>
                <h2 className="text-2xl">
                  <span className="font-bold block">Email: </span>{" "}
                  {sessionUser.user.email}
                </h2>
              </div>

              <div className="md:w-3/4 md:pl-4">
                <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
           
                <ProfileProperties properties={properties}></ProfileProperties>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
