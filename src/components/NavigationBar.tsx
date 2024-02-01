"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Input,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Image from "next/image";
import SurveyLogo from "../assests/survey-form.png";
import { SearchIcon } from "lucide-react";
import { usePathname } from "next/navigation";
export default function NavigationBar() {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Design-Survey",
    "Preview",
    "Json",
    "Analytics",
    "Log Out",
  ];

  return (
    <Navbar
      classNames={{
        base: "sm:!h-[10vh] bg-blue-100 !z-0",
        wrapper: "!max-w-full px-10",
      }}
      position="static"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className={`${path === "/" && "pointer-events-none"}`}>
            <Image src={SurveyLogo} alt={"survey-logo"} width="36" />
            <p className="font-bold text-inherit text-xl text-center !text-blue-400">
              Questionnaire?
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem
          className={`${
            path === "/design" && "rounded-md bg-blue-300 py-1 px-3"
          }`}
          isActive={path === "/design"}
        >
          <Link
            href="/design"
            className={`${path === "/design" && "pointer-events-none "}`}
          >
            Design-Survey
          </Link>
        </NavbarItem>
        <NavbarItem
          className={`${
            path === "/preview" && "rounded-md bg-blue-300 py-1 px-3"
          }`}
          isActive={path === "/preview"}
        >
          <Link
            href="/preview"
            className={`${path === "/preview" && "pointer-events-none "}`}
            aria-current="page"
          >
            Preview
          </Link>
        </NavbarItem>
        {/* <NavbarItem
          className={`${
            path === "/json" && "rounded-md bg-blue-300 py-1 px-3"
          }`}
          isActive={path === "/json"}
        >
          <Link
            href="json"
            className={`${path === "/json" && "pointer-events-none "}`}
          >
            Json
          </Link>
        </NavbarItem> */}
        <NavbarItem
          className={`${
            path === "/usermode" && "rounded-md bg-blue-300 py-1 px-3"
          }`}
          isActive={path === "/usermode"}
        >
          <Link
            href="usermode"
            className={`${path === "/usermode" && "pointer-events-none "}`}
          >
            User-Mode
          </Link>
        </NavbarItem>
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[30rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
          color="primary"
        />
      </NavbarContent>
      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Jason Hughes"
              size="sm"
              src="https://img.icons8.com/fluency/48/user-male-circle--v1.png"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">ansariyasir@gmail.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
