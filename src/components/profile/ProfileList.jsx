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
            router.push(`/board/${item.id}`);
          }}
        >
          <List.Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={item.title}
            description={item.contents}
          />
          <div 
            onClick={(e) => { 
              e.preventDefault() ;
              router.push(`/profile/${item.user.id}`); 
            }}
          >{item.writer}</div>
        </List.Item>
      )}
    >
    </List>
  );
};

export default ProfileList;
