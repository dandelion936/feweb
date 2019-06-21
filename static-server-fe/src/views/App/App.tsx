import React from 'react';
import './App.css';
import { Tree, Row, Col } from 'antd';
import { getDir } from '../../api/dir' 
const { TreeNode, DirectoryTree } = Tree;

class App extends React.Component {
  dirs:any = []
  constructor(props:any) {
    super(props);
    getDir({
      
    }).then(res => {
      this.dirs = res
    })
  }
  onSelect = (keys:any, event:any) => {
    console.log('Trigger Select', keys, event);
  };

  onExpand = () => {
    console.log('Trigger Expand');
  };
  render() {
    return (
      <Row>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          <DirectoryTree multiple defaultExpandAll onSelect={this.onSelect} onExpand={this.onExpand}>
            <TreeNode title="parent 0" key="0-0">
              <TreeNode title="leaf 0-0" key="0-0-0" isLeaf />
              <TreeNode title="leaf 0-1" key="0-0-1" isLeaf />
            </TreeNode>
            <TreeNode title="parent 1" key="0-1">
              <TreeNode title="leaf 1-0" key="0-1-0" isLeaf />
              <TreeNode title="leaf 1-1" key="0-1-1" isLeaf />
            </TreeNode>
          </DirectoryTree>
        </Col>
      </Row>
    );
  }
}

export default App;
