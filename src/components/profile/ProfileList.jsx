import { List, Avatar, Spin, Space } from "antd";
import { useRouter } from "next/router";
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { useObserver } from 'mobx-react';
import { AppContext } from "../App/context";
import { toJS } from "mobx";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const BOARDE_TYPE = {
  FREE: "자유게시판",
};

const ProfileList = (props) => {
  return useObserver(() => {
    const router = useRouter();
    const global = React.useContext(AppContext);

    return (
      <List
        loading={props.loading}
        dataSource={props.dataSource}
        renderItem={(item) => (
          <>
          <List.Item
            key={item.title}
            
            onClick={(e) => {
              e.preventDefault();
              router.push("/board/[cate]/[id]", `/board/${item.board_type}/${item.id}`);
            }}
            actions={[
              <div
                style={{}}
                onClick={(e) => { 
                  e.preventDefault() ;
                  router.push("/profile/[userId]", `/profile/${item.writer}`); 
                }}
              >
                {item.writer == global.state.user.userId ? null : (
                  <>
                    <Avatar 
                      style={{ borderRadius: "50%", border: "1px solid #d9d9d9", marginRight: "10px" }} 
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" 
                    />
                    <span>{item.writer}</span>
                  </>
                )}
                
              </div>,
            ]}
          >
            <List.Item.Meta
              title={`[${BOARDE_TYPE[item.board_type]}] ${item.title}`}
              description={item.contents}
            />
            
          </List.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <IconText icon={StarOutlined} text={item.commentCnt} key="list-vertical-star-o" />
              <IconText icon={LikeOutlined} text={item.rowLike} key="list-vertical-like-o" />
              <IconText icon={MessageOutlined} text={item.viewCount} key="list-vertical-message" />
            </div>
            {item.createdDate}
          </div>
          
          </>
        )}
      >
      </List>
    );
  });
};

export default ProfileList;
