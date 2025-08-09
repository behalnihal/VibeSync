import {
  BellIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  Portal,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider.js";
import ProfileModal from "./ProfileModal.js";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading.js";
import UserListItem from "../UserAvatar/UserListItem.js";
import { getSender } from "../../config/ChatLogics.js";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const history = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      setLoadingChat(false);
      toast({
        title: "Error fetching the chat",
        description:
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="rgba(2, 6, 23, 0.5)"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="1px"
        borderColor="whiteAlpha.300"
        backdropFilter="saturate(160%) blur(12px)"
        boxShadow="0 6px 24px rgba(2, 6, 23, 0.6)"
      >
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
          <Button
            variant="outline"
            borderColor="gray.600"
            color="gray.200"
            _hover={{ bg: "gray.700", borderColor: "gray.500" }}
            onClick={onOpen}
          >
            <i class="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work Sans">
          VibeSync
        </Text>
        <div>
          <Menu strategy="fixed">
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <Portal>
              <MenuList
                bg="gray.800"
                borderColor="gray.700"
                color="gray.200"
                zIndex={10000}
              >
                {!notification.length && "No New Messages"}
                {notification.map((notif) => (
                  <MenuItem
                    key={notif._id}
                    bg="gray.800"
                    color="gray.200"
                    _hover={{ bg: "gray.700", color: "gray.100" }}
                    _focus={{ bg: "gray.700", color: "gray.100" }}
                    onClick={() => {
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n) => n !== notif));
                    }}
                  >
                    {notif.chat.isGroupChat
                      ? `New Message in ${notif.chat.chatName}`
                      : `New Message from ${
                          getSender(user, notif.chat.users) || "Unknown"
                        }`}
                  </MenuItem>
                ))}
              </MenuList>
            </Portal>
          </Menu>

          <Menu strategy="fixed">
            <MenuButton
              as={Button}
              variant="outline"
              borderColor="gray.600"
              color="gray.200"
              _hover={{ bg: "gray.700", borderColor: "gray.500" }}
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <Portal>
              <MenuList
                bg="gray.800"
                borderColor="gray.700"
                color="gray.200"
                minW="260px"
                zIndex={10000}
              >
                <Box px={3} py={3} display="flex" alignItems="center" gap={3}>
                  <Avatar size="sm" name={user.name} src={user.pic} />
                  <Box>
                    <Text fontWeight="semibold">{user.name}</Text>
                    <Text fontSize="xs" color="gray.400">
                      {user.email}
                    </Text>
                  </Box>
                </Box>
                <MenuDivider borderColor="gray.700" />
                <ProfileModal user={user}>
                  <MenuItem
                    bg="gray.800"
                    color="gray.200"
                    _hover={{ bg: "gray.700", color: "gray.100" }}
                    _focus={{ bg: "gray.700", color: "gray.100" }}
                    icon={<ViewIcon />}
                  >
                    My Profile
                  </MenuItem>
                </ProfileModal>
                <MenuItem
                  bg="gray.800"
                  color="gray.200"
                  _hover={{ bg: "gray.700", color: "gray.100" }}
                  _focus={{ bg: "gray.700", color: "gray.100" }}
                  icon={<ExternalLinkIcon />}
                  onClick={logoutHandler}
                >
                  Log Out
                </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </div>
      </Box>

      <Drawer
        placement="left"
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
      >
        <DrawerOverlay bg="blackAlpha.500" />
        <DrawerContent
          bg="rgba(2, 6, 23, 0.5)"
          borderWidth="1px"
          borderColor="whiteAlpha.300"
          backdropFilter="saturate(160%) blur(16px)"
          boxShadow="0 8px 32px rgba(2, 6, 23, 0.65)"
          color="gray.100"
        >
          <DrawerHeader borderBottomWidth="1px" borderColor="whiteAlpha.300">
            Search Users
          </DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                variant="filled"
                bg="gray.700"
                color="gray.100"
                _placeholder={{ color: "gray.400" }}
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                bgGradient="linear(to-r, purple.500, blue.500)"
                color="white"
                _hover={{ bgGradient: "linear(to-r, purple.600, blue.600)" }}
                onClick={handleSearch}
              >
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              <Box
                mt={2}
                borderWidth="1px"
                borderColor="whiteAlpha.200"
                borderRadius="lg"
                bg="rgba(2, 6, 23, 0.5)"
                backdropFilter="saturate(160%) blur(10px)"
                p={2}
              >
                {searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))}
              </Box>
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
