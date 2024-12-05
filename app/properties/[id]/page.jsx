import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

const SingleProperty = async ({ params }) => {
  await connectDB();

  const { id } = await params;
  const propertyDoc = await Property.findById(id).lean();

  const property = convertToSerializeableObject(propertyDoc);

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }
  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="fas fa-arrow-left mr-2"></FaArrowLeft>
            Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            {/* propertyinfo */}
            <PropertyDetails property={property} />
            <aside className="space-y-4">
              <BookmarkButton property = {property} />
              <ShareButtons property = {property} />

              <PropertyContactForm property = {property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images}></PropertyImages>
    </>
  );
};

export default SingleProperty;
