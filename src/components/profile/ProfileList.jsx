import { List, Avatar, Spin } from "antd";
import { useRouter } from "next/router";

const ProfileList = (props) => {
  const router = useRouter();

  return (
    <List
      loading={props.loading}
      dataSource={props.dataSource}
      renderItem={(item) => (
        <List.Item 
          key={item.title} 
          onClick={(e) => {
            e.preventDefault();
            console.log("item : ", JSON.stringify(item, null, 3));
            // router.push(`/board/${item.boardId}`);
          }}
        >
          <List.Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={item.title}
            description={item.description}
          />
          <div 
            onClick={(e) => { 
              e.preventDefault() ;
              router.push(`/profile/${item.user.id}`); 
            }}
          >{item.user.nickname}</div>
        </List.Item>
      )}
    >
    </List>
  );
};

export default ProfileList;
