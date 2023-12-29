import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Image from "next/image";
import { NEXT_PUBLIC_REST_API_ENDPOINT } from "redux/store";
import { useRef, useState } from "react";

const ChatBox = ({ messages, user, host, sendMessage }) => {
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(false);
  const textAreaRef = useRef(null);
  const getUserPicture = (userId) => {
    if (host.id == userId) return host?.profile_picture;
    else if (user.id == userId) return user?.profile_picture;
    else return userId;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const submit = async (e) => {
    setDisabled(true)
    e.preventDefault();
    if (value) {
      await sendMessage(value);
      setValue("")
    }
    setDisabled(false)
  };

  const RenderLeftChat = ({ message }) => (
    <Box
      sx={{
        display: "flex",
        maxWidth: "730px",
        mb: "20px",
      }}
    >
      <Image
        src={getUserPicture(message.from) ? `${NEXT_PUBLIC_REST_API_ENDPOINT}/upload/small_images/${getUserPicture(message.from)}` : "/images/user7.png"}
        alt="User"
        width={35}
        height={35}
        className="borRadius100"
      />
      <Box
        sx={{
          display: "flex",
        }}
        className="ml-1"
      >
        <Box>
          <Typography
            sx={{
              background: "#F5F6FA",
              borderRadius: "0px 15px 15px 15px",
              p: "14px 20px",
              mb: "10px",
            }}
            className="dark-BG-101010"
          >
            {message.message}
          </Typography>

          <Typography fontSize="12px"> {new Date(message.timeSent).toLocaleString()}</Typography>
        </Box>

        {/* Replay Dropdown */}
        {/* <Box className="ml-1">
                <div className="right-replay-box">
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>

                  <div className="hover-caption">
                    <List sx={{ display: "inline" }}>
                      <ListItem disablePadding>
                        <ListItemButton sx={{ padding: "1px 15px" }}>
                          <ReplyIcon
                            fontSize="small"
                            sx={{ mt: "-4px" }}
                            className="mr-5px"
                          />
                          <ListItemText
                            primary="Reply"
                            primaryTypographyProps={{ fontSize: "12px" }}
                          />
                        </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemButton sx={{ padding: "1px 15px" }}>
                          <DeleteOutlineIcon
                            fontSize="small"
                            sx={{ mt: "-4px" }}
                            className="mr-5px"
                          />
                          <ListItemText
                            primary="Delete"
                            primaryTypographyProps={{ fontSize: "12px" }}
                          />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </div>
                </div>
              </Box> */}
      </Box>
    </Box>
  )

  const RenderRightChat = ({ message }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        maxWidth: "730px",
        mb: "20px",
      }}
      className="ml-auto"
    >
      <Box
        sx={{
          display: "flex",
        }}
        className="ml-1"
      >
        {/* Replay Dropdown */}
        {/* <Box>
                <div className="left-replay-box">
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>

                  <div className="hover-caption">
                    <List sx={{ display: "inline" }}>
                      <ListItem disablePadding>
                        <ListItemButton sx={{ padding: "1px 15px" }}>
                          <ReplyIcon
                            fontSize="small"
                            sx={{ mt: "-4px" }}
                            className="mr-5px"
                          />
                          <ListItemText
                            primary="Reply"
                            primaryTypographyProps={{ fontSize: "12px" }}
                          />
                        </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemButton sx={{ padding: "1px 15px" }}>
                          <DeleteOutlineIcon
                            fontSize="small"
                            sx={{ mt: "-4px" }}
                            className="mr-5px"
                          />
                          <ListItemText
                            primary="Delete"
                            primaryTypographyProps={{ fontSize: "12px" }}
                          />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </div>
                </div>
              </Box> */}

        <Box className="mr-1">
          <Typography
            sx={{
              background: "#8f2c4f",
              color: "#fff !important",
              borderRadius: "15px 0 15px 15px",
              p: "14px 20px",
              mb: "10px",
            }}
          >
            {message.message}
          </Typography>

          <Typography fontSize="12px" textAlign="end">
            {new Date(message.timeSent).toLocaleString()}
          </Typography>
        </Box>
      </Box>

      <Image
        src={getUserPicture(message.from) ? `${NEXT_PUBLIC_REST_API_ENDPOINT}/upload/small_images/${getUserPicture(message.from)}` : "/images/user7.png"}
        alt="User"
        width={35}
        height={35}
        className="borRadius100"
      />
    </Box>
  )
  return (
    <>
      <Box
        sx={{
          border: "1px solid #F5F4F6",
          borderRadius: "14px",
        }}
        className="for-dark-chat-box"
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #F5F4F6",
            borderRadius: "10px",
            p: "15px",
          }}
          className="for-dark-chat-header"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Image
              src={user?.profile_picture ? `${NEXT_PUBLIC_REST_API_ENDPOINT}/upload/small_images/${user?.profile_picture}` : "/images/user7.png"}
              alt="User"
              width={40}
              height={40}
              className="borRadius100"
            />
            <Box className="ml-1">
              <Typography as="h5" fontWeight="500">
                {user?.name}
              </Typography>
              {/* <Typography fontSize="12px" position="relative">
                <span className="active-status2 successBgColor"></span> Active
                Now
              </Typography> */}
            </Box>
          </Box>

          <Box>
            {/* <IconButton
              size="small"
              sx={{ background: "#F2F6F8" }}
              className="ml-5px for-dark-button"
            >
              <VideocamIcon />
            </IconButton>

            <IconButton
              size="small"
              sx={{ background: "#F2F6F8" }}
              className="ml-5px for-dark-button"
            >
              <CallIcon />
            </IconButton> */}

            {/* <IconButton
              size="small"
              sx={{ background: "#F2F6F8" }}
              className="ml-5px for-dark-button"
            >
              <MoreVertIcon />
            </IconButton> */}
          </Box>
        </Box>

        {/* Chat List */}
        <div className="chat-list-box" style={{ flexDirection: 'row-reverse' }}>
          {messages?.map((message, index) =>
            host && message.from === user.id ?
              <RenderLeftChat key={index + message.timeSent} message={message} />
              :
              <RenderRightChat key={index + message.timeSent} message={message} />

          )}
        </div>

        {/* Footer */}
        <Box
          sx={{
            background: "#F5F6FA",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            p: "15px",
            position: "relative",
          }}
          className="dark-BG-101010"
        >
          {/* <Box>
            <IconButton
              size="small"
              sx={{ background: "#F2F6F8" }}
              className="mr-5px for-dark-button"
            >
              <VideocamIcon />
            </IconButton>

            <IconButton
              size="small"
              sx={{ background: "#F2F6F8" }}
              className="mr-5px for-dark-button"
            >
              <CallIcon />
            </IconButton>
          </Box> */}

          <Box
            component="form"
            noValidate
            onSubmit={submit}
            sx={{
              flex: "auto",
            }}
            className="pr-60px"
          >
            <TextField
              ref={textAreaRef}
              onChange={(e) => {
                setValue(e.target.value)
              }}
              value={value}
              fullWidth
              id="typeSomething"
              label="Type Something..."
              name="typeSomething"
              autoComplete="typeSomething"
              InputProps={{
                style: {
                  borderRadius: 100,
                  background: "#fff",
                },
              }}
            />

            <Button
            disabled={disabled}
              variant="contained"
              sx={{
                textTransform: "capitalize",
                borderRadius: "100%",
                fontWeight: "500",
                fontSize: "16px",
                padding: "0",
                minWidth: "44px",
                minHeight: "44px",
                position: "absolute",
                top: "22px",
                color: "#fff !important",
              }}
              className="right-20px"
            >
              <SendIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatBox;
