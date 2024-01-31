import { Button } from "@nextui-org/react";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[90vh] p-10 bg-blue-50 flex items-center justify-center">
      <div className="max-w-4xl p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-4xl font-bold mb-4 text-blue-500">
          Create Dynamic Surveys with Ease
        </h1>
        <p className="text-slate-600 mb-4">
          Welcome to our powerful Dynamic Form Builder, where you can
          effortlessly craft engaging survey forms tailored to your needs.
        </p>
        <div className="flex items-center justify-center">
          <Link href={"/design"}>
            <Button
              radius="none"
              variant="shadow"
              color="primary"
              className="flex gap-2 text-base font-semibold text-white rounded-mdtransition duration-300"
            >
              Create Survey
              <MoveRight size={"18"} />
            </Button>
          </Link>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            Key Features
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              Choose from a variety of question types, including single-input,
              radio group, checkboxes, and more.
            </li>
            <li>
              Create sophisticated surveys with conditional logic, making your
              forms smarter and more interactive.
            </li>
            <li>
              Effortlessly manage your questions with a user-friendly question
              list.
            </li>
            <li>
              Experience a responsive design that adapts seamlessly to different
              devices and screen sizes.
            </li>
            <li>
              Utilize the Logic Editor to set up conditional rules for dynamic
              form behavior.
            </li>
          </ul>
        </div>

        <div className="">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            How It Works
          </h2>
          <p className="text-gray-600">
            Building a survey is as simple as dragging and dropping question
            types, defining conditions, and previewing your creation in
            real-time. Our intuitive interface empowers you to design surveys
            that truly resonate with your audience.
          </p>
        </div>
      </div>
    </div>
  );
}
