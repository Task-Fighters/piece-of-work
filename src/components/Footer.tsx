import { MdArticle, MdHome, MdAddCircleOutline, MdPerson2 } from "react-icons/md";

interface FooterProps {
    userType?: "admin" | "user";
    image: string,
    onClick?: () => void;
  }
  
  const BASE_FOOTER =
    "fixed bottom-0 left-0 z-20 bg-white border-t-[1px] border-solid border-black w-full w-full py-6 px-8";

  export const Footer = ({
    userType = "admin",
    image = "",
    onClick,
  }: FooterProps) => {
    let mode = userType === 'admin' ? "flex" : "hidden";
  
    const classes = `${BASE_FOOTER}`;
  
    return (
      <div className={classes} onClick={onClick}>
        <ul className="flex items-center justify-between w-full font-medium text-pink-600">
        <li>
            <a href="/assignments" className="mr-4 hover:drop-shadow-md flex items-center">
                <MdArticle style={{fontSize: "24px"}}/>
            </a>
        </li>
        <li>
            <a href="/home" className="mr-4 hover:drop-shadow-md flex items-center">
                <MdHome style={{fontSize: "24px"}}/>
            </a>
        </li>

        <li className={`${mode}`}>
            <a href="/add_assignment" className={`mr-4 hover:drop-shadow-md flex items-center`}>
            <MdAddCircleOutline style={{fontSize: "24px"}}/>
            </a>
        </li>
        <li>
            <a href="/profile" className="hover:drop-shadow-md flex items-center">
                <MdPerson2 style={{fontSize: "24px"}}/>
            </a>
        </li>
    </ul>
      </div>
    );
  };
  