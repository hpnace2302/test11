
// import React, { useEffect, useState } from 'react';
// import './App.css';
// import { Ajax, getValue } from '@syncfusion/ej2-base';
// import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Sort, PageSettingsModel, EditSettingsModel, DataStateChangeEventArgs } from '@syncfusion/ej2-react-treegrid';
// import { DataResult } from '@syncfusion/ej2-data';
// import { DataSourceChangedEventArgs } from '@syncfusion/ej2-grids';

// const Posts = () => {
//   var treegridObj: TreeGridComponent;
//   const dataService: DataService = new DataService();
//   const pageSettings: PageSettingsModel = { pageSize: 4, pageSizeMode: 'Root' };
//   const editSettings: EditSettingsModel = { allowAdding: true, allowDeleting: true, allowEditing: true, mode: 'Row' };

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//       .then((response) => response.json())
//       .then((json) => console.log(json));
//   },[])

//   const getData = (): void => {
//     if (treegridObj && (treegridObj.dataSource instanceof Array
//       && !(treegridObj.dataSource as object[]).length)) {
//       const state = { skip: 0, take: 4 }; /// take value should always be equal to the pageSize of   TreeGrid
//       dataStateChange(state);
//     }
//   }

//   const dataStateChange = (state: DataStateChangeEventArgs): void => {
//     if (state.requestType === 'expand') {
//       dataService.execute(state).then((childData: any) => {
//         state.childData = childData;
//         // state.childDataBind();
//       });
//     } else {
//       dataService.execute(state).then((treedata) => {
//         if (treegridObj) {
//           treegridObj.dataSource = treedata;
//         }
//       });
//     }
//   }

//   const dataSourceChanged = (state: any) => {
//     // if (state.action === 'add') {
//     //   dataService.addRecord(state).then(() => state.endEdit());
//     // } else if (state.action === 'edit') {
//     //   dataService.updateRecord(state).then(() => state.endEdit());
//     // } else if (state.requestType === 'delete') {
//     //   dataService.deleteRecord(state).then(() => state.endEdit());
//     // }
//   }

//   return (
//     <div className="App">
//       <TreeGridComponent
//         dataSource={[]}
//         dataBound={getData}
//         ref={treegrid => treegridObj = treegrid}
//         dataSourceChanged={dataSourceChanged}
//         dataStateChange={dataStateChange}
//         id="TreeGrid"
//         idMapping='userId'
//         parentIdMapping='id'
//         allowPaging={true}
//         treeColumnIndex={1}
//         pageSettings={pageSettings}
//         editSettings={editSettings}
//         hasChildMapping='isParent'
//       >
//         <ColumnsDirective>
//           <ColumnDirective field='userId' headerText='User ID' width='70' />
//           <ColumnDirective field='id' headerText='ID' width='160' isPrimaryKey={true} />
//           <ColumnDirective field='title' headerText='Title' width='90' />
//           <ColumnDirective field='body' headerText='Body' width='90' />
//         </ColumnsDirective>
//         <Inject services={[Page, Edit, Sort]} />
//       </TreeGridComponent>
//     </div>
//   );
// }

// export class DataService {
//   public ajax: Ajax = new Ajax({
//     mode: true,
//     onFailure: (e: Error) => false,
//     type: 'GET'
//   });
//   private BASE_URL: string = 'https://jsonplaceholder.typicode.com/posts/';

//   public execute(state: DataStateChangeEventArgs): Promise<DataResult> {
//     if (state.requestType === 'expand') {
//       return this.getChildData(state);
//     } else {
//       return this.getData(state);
//     }
//   }

//   private getData(state: DataStateChangeEventArgs): Promise<DataResult> {
//     // const pageQuery = `$skip=${state.skip}&$top=${state.take}`;

//     /// filter query for fetching only the root level records
//     // const treegridQuery = "$filter='ParentId eq null'";

//     this.ajax.url = `${this.BASE_URL}`;

//     return this.ajax.send().then((response: any) => {
//       const data: any = JSON.parse(response);
//       return {
//         count: parseInt(getValue('d.__count', data), 10),
//         result: getValue('d.results', data)
//       };
//     });
//   }

//   private getChildData(state: DataStateChangeEventArgs): Promise<DataResult> {
//     // let expandQuery: any;
//     // if (state.requestType === 'expand') {
//     //   expandQuery = `$filter=${'ParentId eq ' + getValue('TaskId', state.data)}`;
//     // }
//     this.ajax.url = `${this.BASE_URL}`;

//     return this.ajax.send().then((response: any) => {
//       const data: any = JSON.parse(response);
//       return data;
//     });
//   }

//   // public addRecord(state: DataSourceChangedEventArgs): Promise<DataResult> {
//   //   const add: Ajax = new Ajax({
//   //     mode: true,
//   //     onFailure: (e: Error) => false,
//   //     type: 'POST'
//   //   });
//   //   return add.send(JSON.stringify(state.data)).then((response: any) => {
//   //     const data: any = JSON.parse(response);
//   //     return data;
//   //   });
//   // }
//   // public updateRecord(state: DataSourceChangedEventArgs): Promise<DataResult> {
//   //   const update: Ajax = new Ajax({
//   //     mode: true,
//   //     onFailure: (e: Error) => false,
//   //     type: 'PUT'
//   //   });
//   //   return update.send(JSON.stringify(state.data)).then((response: any) => {
//   //     const data: any = JSON.parse(response);
//   //     return data;
//   //   });
//   // }
//   // public deleteRecord(state: DataSourceChangedEventArgs): Promise<DataResult> {
//   //   const remove: Ajax = new Ajax({
//   //     mode: true,
//   //     onFailure: (e: Error) => false,
//   //     type: 'DELETE'
//   //   });
//   //   return remove.send(JSON.stringify((state.data && state.data[0]))).then((response: any) => {
//   //     const data: any = JSON.parse(response);
//   //     return data;
//   //   });
//   // }
// };


// import { Ajax, getValue } from '@syncfusion/ej2-base';
// import { ColumnDirective, ColumnsDirective, DataStateChangeEventArgs, Grid, GridComponent } from '@syncfusion/ej2-react-grids';
// import { DataResult, DataSourceChangedEventArgs, Edit, Inject, Page, PageSettingsModel, Toolbar } from '@syncfusion/ej2-react-grids';
// import DataManager from '@syncfusion/ej2-data'
// import * as React from 'react';

// export default class Posts extends React.Component<{}, {}> {
// public orderService: OrderService = new OrderService();
// public grid: Grid | null;
// public data: any;  
// public toolbarOptions: any = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
// public editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true };
  
// public pageSettings: PageSettingsModel = { pageSize: 10 };
// public renderComplete() {
//     if(this.grid && (this.grid.dataSource instanceof Array
//         && !(this.grid.dataSource as object[]).length)) {
//         const state = { skip: 0, take: 10 };
//         this.dataStateChange(state);
//     }
// }
// public dataStateChange(state : DataStateChangeEventArgs) {
//   this.orderService.execute(state).then(( gridData ) => {
//     if (this.grid) {
//         this.grid.dataSource = gridData
//     }
//   });
// }
// public dataSourceChanged(state: DataSourceChangedEventArgs): void {
//   if (state.action === 'add') {
//     this.orderService.addRecord(state).then(() => state.endEdit());
//   } else if (state.action === 'edit') {
//     this.orderService.updateRecord(state).then(() => state.endEdit());
//   } else if (state.requestType === 'delete') {
//     this.orderService.deleteRecord(state).then(() => state.endEdit());
//   }
// }
  
// public render() {
//   this.dataStateChange = this.dataStateChange.bind(this);
//   this.dataSourceChanged = this.dataSourceChanged.bind(this);
//   this.renderComplete = this.renderComplete.bind(this);
//   return (
//     <div className='control-pane'>
//       <div className='control-section'>
//         <GridComponent dataSource={this.data} 
//           ref={g => this.grid = g} 
//           editSettings={this.editSettings}
//           toolbar={this.toolbarOptions} 
//           allowPaging={true} 
//           allowSorting={true} 
//           pageSettings={this.pageSettings}
//           allowGrouping={true} 
//           dataStateChange={this.dataStateChange}
//           dataSourceChanged={this.dataSourceChanged} 
//           dataBound={this.renderComplete}
//         >
//           <ColumnsDirective>
//             <ColumnDirective field='userId' headerText='User ID' width='70' />
//             <ColumnDirective field='id' headerText='ID' width='160' isPrimaryKey={true} />
//             <ColumnDirective field='title' headerText='Title' width='90' />
//             <ColumnDirective field='body' headerText='Body' width='90' />
//           </ColumnsDirective>
//           <Inject services={[Page, Edit, Toolbar]} />
//         </GridComponent>
//       </div>
//     </div>
//   )
// }
//   };
  
// export class OrderService {
// public ajax: Ajax = new Ajax({
//     mode: true,
//     onFailure: (e: Error) => false,
//     type: 'GET'
// });
// private BASE_URL: string = 'https://jsonplaceholder.typicode.com/posts/';
  
// public execute(state: DataStateChangeEventArgs): Promise<DataResult> {
//     return this.getData(state);
// }
// public addRecord(state: DataSourceChangedEventArgs) : Promise<DataResult> {
//     const add: Ajax = new Ajax({
//         mode: true,
//         onFailure: (e: Error) => false,
//         type: 'POST'
//     });
//     return add.send(JSON.stringify(state.data)).then((response: any) => {
//         const data: any = JSON.parse(response);
//         return data;
//     });
// }
// public updateRecord(state: DataSourceChangedEventArgs) : Promise<DataResult> {
//     const update: Ajax = new Ajax({
//         mode: true,
//         onFailure: (e: Error) => false,
//         type: 'PUT'
//     });
//     return update.send(JSON.stringify(state.data)).then((response: any) => {
//         const data: any = JSON.parse(response);
//         return data;
//     });
// }
// public deleteRecord(state: DataSourceChangedEventArgs) : Promise<DataResult> {
//     const remove: Ajax = new Ajax({
//         mode: true,
//         onFailure: (e: Error) => false,
//         type: 'DELETE'
//     });
//     return remove.send(JSON.stringify((state.data && state.data[0]))).then((response: any) => {
//         const data: any = JSON.parse(response);
//         return data;
//     });
// }
// private getData(state: DataStateChangeEventArgs): Promise<DataResult> {
//     const pageQuery = state.skip ? `$skip=${state.skip}&$top=${state.take}` : `$top=${state.take}`;
//     this.ajax.url = `${this.BASE_URL}?${pageQuery}&$inlinecount=allpages&$format=json`;
  
//     return this.ajax.send().then((response: any) => {
//         const data: any = JSON.parse(response);
//         return {
//             count:  parseInt(getValue('d.__count', data), 10),
//             result: getValue('d.results', data)
//         };
//     });
// }
//   };

// export default Posts

const App = () => {
  return (
    <>null</>
  )
}

export default App