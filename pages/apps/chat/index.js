import React, { useRef } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ChatBox from "@/components/Apps/Chat/ChatBox";
import ChatBoxTwo from "@/components/Apps/Chat/ChatBoxTwo";
import ChatBoxThree from "@/components/Apps/Chat/ChatBoxThree";
import { Loader } from "@mantine/core";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { NEXT_PUBLIC_REST_API_ENDPOINT, socket } from "redux/store";
import { debounce } from "lodash";
import useOuterClick from "@/components/hooks/useOutSideClick";
import Image from "next/image";

// Search field style
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 100,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 0,
  marginLeft: 0,
  marginBottom: 20,
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    marginRight: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: "#8f2c4f",
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: "0",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "5",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    backgroundColor: "#F5F7FA",
    borderRadius: "30px",
    padding: theme.spacing(1.4, 0, 1.4, 2),
  },
}));

export default function Chat() {


  const [toggler, setToggler] = useState(false);

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isJoinedRoom, setIsJoinedRoom] = useState(false);
  const [isJoiningDelay, setIsJoiningDelay] = useState(false);
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(null);
  const token = Cookies.get("auth_token");
  const userid = Cookies.get("user");
  const [roomId, setRoomId] = useState(null);
  const [hostData, setHostData] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [userId, setUserId] = useState(null);

  const [rooms, setRooms] = useState([]);

  function handleCurrentChat(id) {
    if (isConnected) {
      const newroom = rooms.find((room) => room.id == id);
      //setTimeout(() => setIsJoiningDelay(false), 800);
      socket.emit(
        "join_room",
        { socketId: socket.id, roomName: newroom.name },
        () => {
          setUserId(newroom.user.id);
          setIsJoinedRoom(true);
          setRoom(newroom);
          setRoomId(id);
        }
      );
    }
  }

  const fetchUserList = useMemo(() => {
    const loadOptions = (value) => {
      console.log("fetching user", value);
      axios
        .get(`${NEXT_PUBLIC_REST_API_ENDPOINT}/user/by-name/${value}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((body) => {
          setUsersList(body.data);
        })
        .catch(() => {
          setUsersList(["Not Found"]);
        });
    };

    return debounce(loadOptions, 500);
  }, []);

  useEffect(() => {
    if (roomId)
      axios
        .get(
          `${NEXT_PUBLIC_REST_API_ENDPOINT}/message/conversation/${roomId}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setMessages(response.data.items.reverse());
        });
  }, [roomId]);

  useEffect(() => {
    axios
      .get(`${NEXT_PUBLIC_REST_API_ENDPOINT}/user`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((response) => {
        setHostData(response.data);
      });
  }, []);

  useEffect(() => {
    if (room) getRooms();
  }, [room]);

  const getRooms = async () => {
    const response = await axios.get(
      `${NEXT_PUBLIC_REST_API_ENDPOINT}/room/rooms`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    setRooms(response.data);
  };

  useEffect(() => {
    if (isConnected && userId) {
      setIsJoiningDelay(true);
      const joinRoom = {
        user: { socketId: socket.id },
        token,
        userid: userId,
        eventName: "join_room",
      };
      setTimeout(() => setIsJoiningDelay(false), 800);
      socket.emit("join_room", joinRoom, async (err, response) => {
        if (response) {
          setIsJoinedRoom(true);
          setRoom(response.data);
          setRoomId(response.data.id);
          await getRooms();
        } else if (err) {
          setIsJoinedRoom(true);
          setRoom(err.data);
          setRoomId(err.data.id);
          await getRooms();
        }
      });
    }
  }, [userId, isConnected]);

  const iniateChat = () => {
    setIsJoiningDelay(true);
    const joinRoom = {
      user: { socketId: socket.id },
      token,
      userid: userId ? userId : userid,
      eventName: "join_room",
    };
    setTimeout(() => {
      setIsJoiningDelay(false);
    }, 800);
    socket.emit("join_room", joinRoom, (err, response) => {
      if (response) {
        setIsJoinedRoom(true);
        if (response.data) {
          setRoom(response.data);
          setRoomId(response.data.id);
        }
      } else if (err) {
        setIsJoinedRoom(true);
        if (err.data) {
          setRoom(err.data);
          setRoomId(err.data.id);
        }
      }
    });
    setIsConnected(true);
  }

  useEffect(() => {
    console.log('as;odkalksmdas', isConnected)
    if (isConnected)
      iniateChat()
    else
      socket.on("connect", () => {
        iniateChat()
      });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("chat", async (e) => {
      console.log("messages asdasdas", e);
      await getRooms();
      setMessages((messages) => [
        ...messages, { ...e.message, delivered: true }
      ]);
    });

    socket.on("chat_new", async (e) => {
      console.log("entring in new chat", e);
      await getRooms();
    });

    socket.connect();
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat");
      Cookies.remove("user");
    };
  }, []);

  const sendMessage = (message) => {
    return new Promise((resolve, reject) => {
      if (hostData && socket && room.name) {
        const chatMessage = {
          message,
          from: hostData.id,
          to: room.user_id == hostData.id ? room.host_id : room.user_id,
          timeSent: Date.now(),
          room_id: room.id,
        };

        socket.emit("chat", { room, message: chatMessage }, (response) => {
          if (response) {
            resolve()
          }
        });
      }
    })

  };

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const innerRef = useOuterClick(() => setUsersList([]));
  const [index, setIndex] = useState(null);
  const valueRef = useRef(null);

  const onSearch = (setValue) => {
    setUserId(value.id);
  };

  const handleChange = async (val) => {
    setValue(val.target.value);

    valueRef.current = val.target.value;
    if (val.target.value) {
      setLoading(true);
      fetchUserList(val.target.value);
      setLoading(false);
    } else {
      setUsersList([]);
    }
  };

  const onCLickList = () => {
    onSearch(value);
    setUsersList([]);
  };

  console.log('alsdnkaklsdnalksda', isJoiningDelay, isJoinedRoom)

  return (
    isJoinedRoom && !isJoiningDelay ? (<>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Chat</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Chat</li>
        </ul>
      </div>

      <Tabs className="chat-tabs">
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
        >
          <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
            <Card
              sx={{
                boxShadow: "none",
                p: "20px",
                mb: "15px",
              }}
            >
              <Typography
                as="h1"
                sx={{
                  fontSize: 17,
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Users
              </Typography>
              {/* Search */}
              <Search
                onSearch={onSearch}
                loading={loading}
                value={value?.name}
                onChange={handleChange}
                className="ls-search-form"
              >
                <SearchIconWrapper className="search-btn">
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search here.."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              {usersList[0] && (
                <div
                  ref={innerRef}
                  style={{ width: '300px', height: '150px', minHeight: 'auto', backgroundColor: '#3B82F6', position: 'fixed', border: '1px solid #9CA3AF', borderRadius: '0.375rem', zIndex: 1111 }}
                >
                  {usersList.map((val, i) => (
                    <div
                      onClick={onCLickList}
                      onMouseEnter={() => {
                        setIndex(i);
                        setValue(val);
                      }}
                      onMouseLeave={() => {
                        setIndex(null);
                        setValue(valueRef.current);
                      }}
                      style={{ cursor: "pointer", paddingLeft: "10px", fontSize: 12, height: "30px", backgroundColor: index == i ? "#DAE8F3" : "#D8D8D8", }}
                    >
                      <a>{val.name}</a>
                    </div>
                  ))}
                </div>
              )}

              {/* All Messages */}
              <Typography mb="10px">
                <i className="ri-message-2-line"></i> ALL MESSAGES
              </Typography>

              <TabList>
                {rooms.map((item) =>
                  <Tab key={item.id} onClick={() => handleCurrentChat(item.id)}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      style={
                        roomId == item.id
                          ? {
                            backgroundColor: "lightgray",
                            padding: 4,
                            borderRadius: 4,
                          }
                          : { backgroundColor: "white" }
                      }
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                          }}
                        >
                          <Image
                            src={item?.user?.profile_picture ? `${NEXT_PUBLIC_REST_API_ENDPOINT}/upload/small_images/${item?.user?.profile_picture}` : "/images/user7.png"}
                            alt="User"
                            width={45}
                            height={45}
                            className="borRadius100"
                          />
                        </Box>

                        <Box className="ml-1">
                          <Typography
                            as="h4"
                            fontSize="13px"
                            fontWeight="500"
                            mb="5px"
                          >
                            {item?.user?.name}
                          </Typography>
                          {/* <Typography fontSize="12px">Hello Joseph!!</Typography> */}
                        </Box>
                      </Box>

                      <Box textAlign="right">
                        <Typography
                          sx={{
                            color: "#A9A9C8",
                            fontSize: "11px",
                          }}
                        >
                          7:30 PM
                        </Typography>

                        {/* <Box className="mr-10px">
                        <Badge
                          badgeContent={2}
                          color="primary"
                          className="for-dark-text-white"
                        ></Badge>
                      </Box> */}
                      </Box>
                    </Box>
                  </Tab>
                )}

              </TabList>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
            <Card
              sx={{
                boxShadow: "none",
                p: "25px 20px",
                mb: "15px",
                borderRadius: "10px",
              }}
            >
              <TabPanel>
                {/* ChatBox */}
                {room && room?.user && (
                  <ChatBox
                    user={room?.user}
                    host={hostData}
                    messages={messages}
                    sendMessage={sendMessage}
                  />
                )}
              </TabPanel>
            </Card>
          </Grid>
        </Grid>
      </Tabs>
    </>) : (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',

      }}
      >
        <Loader message={`Loading...`}></Loader>
      </div>
    ))
}
