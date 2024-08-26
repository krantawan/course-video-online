export default function Contact() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-gray-700">
        We would love to hear from you! If you have any questions, feedback, or
        inquiries, please feel free to reach out to us.
      </p>
      <p className="text-lg text-gray-700 mt-4">
        You can contact us via email at:{" "}
        <a href="mailto:support@videocourses.com" className="text-blue-500">
          support@videocourses.com
        </a>
      </p>
      <p className="text-lg text-gray-700 mt-4">
        Or call us at:{" "}
        <a href="tel:+1234567890" className="text-blue-500">
          +1 234 567 890
        </a>
      </p>
    </div>
  );
}
