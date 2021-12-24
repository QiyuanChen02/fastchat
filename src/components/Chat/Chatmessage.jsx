import { auth } from "../../firebase";
import { getTime } from "../../helpers/helperfunctions";

function ChatMessage({ uid, text, createdAt, username }) {

    let messageClass;
    if (!username) {
        messageClass = "info"
    } else {
        messageClass = uid === auth.currentUser.uid ? "sent" : "received";
    }

    return (
        <div className={`messageWrapper ${messageClass}`}>
            <div className="message">
                <p className="messageInfo">{`${username} ${getTime(createdAt)}`}</p>
                <p className="text">{text}</p>
            </div>
        </div>
    );
};

export default ChatMessage;