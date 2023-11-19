import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Posts from "../components/Posts";
import { FaEye, FaRegHeart, FaRegStar } from "react-icons/fa";
import { LuThumbsUp } from "react-icons/lu";
import { MdVerified } from "react-icons/md";
import { TbDiamondFilled } from "react-icons/tb";

const Profile = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("userData.json"); // Adjust the path accordingly
      const data = await response.json();
      setData(data.user);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* <Navbar /> */}

      <div
        className="h-[33vh] xl:h-[40vh] w-full bg-no-repeat opacity-80 bg-fixed bg-cover"
        style={{
          backgroundImage: `url(${data?.background_url})`,
          backgroundSize: "cover",
        }}
      ></div>
      <div className="flex justify-center ">
        <div className="border-2 shadow-2xl lg:mb-6 lg:w-[75vw]">
          <div className="flex justify-center gap-4 pr-6 relative -top-8">
            <div className="rounded-full border-2 border-[#808080] h-36 w-36 shadow-2xl">
              <img
                src={data?.user_image}
                className="object-cover rounded-full h-full w-full"
                alt="User"
              />
            </div>

            <div className="relative top-10">
              <div className="flex items-center gap-2">
                <div className="py-3 text-2xl font-bold capitalize">
                  {data?.fullName}
                </div>

                <div className="flex items-center">
                  <TbDiamondFilled className="text-purple-500 text-xl" />
                  <MdVerified className="text-green-500 text-lg" />
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <div>
                  <div className="border-2 border-[#808080] text-center rounded-lg font-semibold text-lg text-[#808080] w-20 shadow-md">
                    {data?.followers}
                  </div>
                  <div className="text-sm text-center capitalize py-2  text-[#808080]">
                    followers
                  </div>
                </div>

                <div>
                  <div className="border-2 border-[#808080] text-center rounded-md font-semibold text-lg text-[#808080] w-20 shadow-md">
                    {data?.following}
                  </div>
                  <div className="text-sm text-center capitalize py-2  text-[#808080]">
                    following
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pl-10 mt-1 pb-6 sm:text-xl  text-[#808080]">
            <div>{data?.bio}</div>

            <a
              href={data?.insta_link}
              target="_blank"
              className="text-[#64c5d9] py-1"
            >
              {data?.insta_link}
            </a>

            <div className="flex gap-3 items-center py-2">
              <div className="rounded-full bg-blue-300 p-1 text-white">
                <FaRegStar />
              </div>
              <div className="text-sm sm:text-md">{data?.stats.stars}</div>

              <div className="rounded-full bg-yellow-400 p-1 text-white">
                <LuThumbsUp />
              </div>
              <div className="text-sm sm:text-md">{data?.stats.likes}</div>

              <div className="rounded-full bg-gray-400 p-1 text-white">
                <FaEye />
              </div>
              <div className="text-sm sm:text-md">{data?.stats.views}</div>

              <div className="rounded-full bg-red-500 p-1 text-white">
                <FaRegHeart />
              </div>
              <div className="text-sm sm:text-md">{data?.stats.hearts}</div>
            </div>
          </div>

          <div className="pt-4">
            <Tabs variant="enclosed-colored" colorScheme="yellow">
              <TabList>
                <Tab fontWeight="bold" color="#2b8dd8" paddingX="20px">
                  {data?.posts.length} Posts
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  {data?.posts.map((item, index) => (
                    <Posts
                      key={index}
                      userName={data?.username}
                      title={item.title}
                      content={item.content}
                      type={item.type}
                      createdAt={item.createdAt}
                      readAt={item.readAt}
                      views={item.postViews}
                    />
                  ))}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
