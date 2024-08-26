import MyProfile from "../components/Profile";

export default function Profile() {
  return (
    <div className="container mx-auto md:p-4 sm:p-4 ">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <hr className="mb-4" />
      <MyProfile />
    </div>
  );
}
