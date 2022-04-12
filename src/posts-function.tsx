// import { Ajax, getValue } from '@syncfusion/ej2-base';
import { ColumnDirective, ColumnsDirective, DataStateChangeEventArgs, TreeGridComponent } from '@syncfusion/ej2-react-treegrid';
import { Edit, Inject, Page, PageSettingsModel, Toolbar } from '@syncfusion/ej2-react-treegrid';
// import { DataManager, UrlAdaptor, WebApiAdaptor} from '@syncfusion/ej2-data'
import React, { useEffect, useState } from 'react';
import { getPosts, addPost, updatePost, deletePost } from "./postsServer"
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);

const Posts = () => {
  const toolbarOptions: any = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  const editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true };
  const pageSettings: PageSettingsModel = { pageSize: 5, pageSizes: true, pageCount: 4};

  const [ data, setData ] = useState([])
  useEffect(() => {
    refreshGrid();
  }, []);

  function refreshGrid() {
    getPosts()
      .then(
        data => {
          setData(data);
        }
      );
  }

  function dataStateChange(args: any){
    console.log(args);
    
    refreshGrid();
  }

  function dataSourceChanged (state: any) {
    console.log(state);
    
    if (state.action === "add") { 
      addPost(state.data)
        .then(res => state.endEdit());
    } else if (state.action === "edit") {
      updatePost(state.data)
        .then(res => state.endEdit());
    } else if (state.requestType === "delete") {
      deletePost(state.data[0].id)
        .then(res => state.endEdit());
    }
  }
  
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <TreeGridComponent 
          idMapping='id' 
          parentIdMapping='userId'
          dataSource={data}
          editSettings={editSettings}
          toolbar={toolbarOptions} 
          allowPaging={true} 
          allowSorting={true} 
          pageSettings={pageSettings}
          dataStateChange={dataStateChange}
          dataSourceChanged={dataSourceChanged}
        >
          <ColumnsDirective>
            <ColumnDirective field='userId' headerText='User ID' />
            <ColumnDirective field='id' headerText='ID'isPrimaryKey={true} />
            <ColumnDirective field='title' headerText='Title' />
            <ColumnDirective field='body' headerText='Body' />
          </ColumnsDirective>
          <Inject services={[Page, Edit, Toolbar]} />
        </TreeGridComponent>
      </div>
    </div>
  )
}

export default Posts