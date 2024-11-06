// import { Version } from '@microsoft/sp-core-library';
// import {
//   type IPropertyPaneConfiguration,
//   PropertyPaneTextField
// } from '@microsoft/sp-property-pane';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from '@pnp/sp/presets/all';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import styles from './NewPositionWpWebPart.module.scss';


export interface INewPositionWpWebPartProps {
  description: string;
  Grade: { Id: number, Title: string }[];
}

export interface GradeItem {
  Id: number;
  value: string;
}

export default class NewPositionWpWebPart extends BaseClientSideWebPart<INewPositionWpWebPartProps> {
   
  public async onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public async render(): Promise<void> {
    this.domElement.innerHTML = `
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        
        <h3 class="ps-3"> ➕ Create New Position</h3>
        <hr>
        <br><br>
        <div class="container">
            <div class="row">
              <div class=" col-md-6 form-group mb-4">
                <label for="positionName">Name<span style="color: red"> *</span> </label>
                <input type="text" class="form-control form-control-sm" id="positionName" placeholder="Write Name" maxlength="60"></input>
                <div id= "positionNameError"style="color:red; font-size: 12px"></div>
              </div>
              <div class=" col-md-6 form-group  mb-4">
                <label for="JobName">Job<span style="color: red"> *</span></label>
                <select class="form-select form-select-sm" id="JobName" required ></select>
                <div id= "JobNameError"style="color:red; font-size: 12px"></div>
              </div>
            </div>
            <div class="row">
              <div class=" col-md-6 form-group mb-4" >
                <label for="Grade">Level & Grade<span style="color: red"> *</span></label>
                <select class="form-control form-select form-select-sm" id="Grade" required placeholder="select level and grade"></select>
                <div id= "GradeError"style="color:red; font-size: 12px"></div>
              </div>
              <div class="col-md-6 form-group mb-4">
                <label for="manPower">Manpower needed<span style="color: red"> *</span> </label>
                <input type="Number" class="form-control form-control-sm" id="manPower" required placeholder="Select Manpower Needed"></input>
                <div id="manPowerError" style="color:red; font-size: 12px"></div>
              </div>
            </div>
          <hr><br>

          <h5>Position Organization Unit</h5>
          <div class="${styles.sideLine}"></div>
          <div class="row">
              <div class=" col-md-3 form-group mb-4">
                <label for="Group">Group<span style="color: red"> *</span></label>
                <select class="form-control form-select form-select-sm" id="Group" placeholder="Select Group"></select>
                <div id= "GroupError"style="color:red; font-size: 12px"></div>
              </div>
              <div class=" col-md-3 form-group mb-4">
                <label for="Region">Region</label>
                <select class="form-control form-select form-select-sm" id="Region" placeholder="Select Region"></select>
              </div>
              <div class=" col-md-3 form-group mb-4">
                <label for="Area">Area</label>
                <select class="form-control form-select form-select-sm" id="Area" placeholder="Select Area"></select>
              </div>
              <div class=" col-md-3 form-group mb-4">
                <label for="BU">Business Unit</label>
                <select class="form-control form-select form-select-sm" id="BU" placeholder="Select Business Unit"></select>
              </div>
            
          </div>

          <div class="row">
            <div class=" col-md-3 form-group mb-4">
              <label for="Department">Department</label>
              <select class="form-control form-select form-select-sm" id="Department" placeholder="Select Department"></select>
            </div>
            <div class=" col-md-3 form-group mb-4">
              <label for="Section">Section</label>
              <select class="form-control form-select form-select-sm" id="Section" placeholder="Select Section"></select>
            </div>
            <div class="col-md-3 form-group mb-4">
              <label for="subSection">Sub-Section</label>
              <select class="form-control form-select form-select-sm" id="subSection" placeholder="Select Sub-Section"></select>
            </div>
          
          </div>
          <hr><br>

          
            <h5>Direct Manager Position</h5>
            <div class="${styles.sideLine}"></div>
          
            <div class="row">
              <div class=" col-md-3 form-group mb-4">
                <label for="DMGroup">Group<span style="color: red"> *</span></label>
                <select class="form-control form-select form-select-sm" id="DMGroup" placeholder="Select Group"></select>
                <div id="DMGroupError" style="color: red; font-size: 12px"></div>
              </div>
              <div class=" col-md-3 form-group mb-4">
                <label for="DMRegion">Region</label>
                <select class="form-control form-select form-select-sm" id="DMRegion" placeholder="Select Region"></select>
              </div>
              <div class=" col-md-3 form-group mb-4">
                <label for="DMArea">Area</label>
                <select class="form-control form-select form-select-sm" id="DMArea" placeholder="Select Area"></select>
              </div>
              <div class=" col-md-3 form-group mb-4">
                <label for="DMBU">Business Unit</label>
                <select class="form-control form-select form-select-sm" id="DMBU" placeholder="Select Business Unit"></select>
              </div>          
            </div>
            <div class="row">
              <div class=" col-md-3 form-group mb-4">
                <label for="DMDepartment">Department</label>
                <select class="form-control form-select form-select-sm" id="DMDepartment" placeholder="Select Department"></select>
              </div>
              <div class=" col-md-3 form-group mb-4">
                <label for="DMSection">Section</label>
                <select class="form-control form-select form-select-sm" id="DMSection" placeholder="Select Section"></select>
              </div>
              <div class="col-md-3 form-group mb-4">
                <label for="DMsubSection">Sub-Section</label>
                <select class="form-control form-select form-select-sm" id="DMsubSection" placeholder="Select Sub-Section"></select>
              </div>
              <div class="col-md-3 form-group mb-4">
                <label for="DManagerPosition">Direct Manager <span style="color: red"> *</span></label>
                <select class="form-control form-select form-select-sm" id="DManagerPosition" placeholder="Select Direct Manager"></select>
                <div id="DManagerPositionError" style="color: red; font-size: 12px"></div>
              </div>
            </div>
          
          

          
            <h5>Indirect Manager Position</h5>
            <div class="${styles.sideLine}"></div>
            <div class="row">
              <div class=" col-md-3 form-group mb-4">
                <label for="IDMGroup">Group</label>
                <select class="form-control form-select form-select-sm" id="IDMGroup" placeholder="Select Group"></select>
              </div>
              <div class=" col-md-3 form-group mb-4">
                <label for="IDMRegion">Region</label>
                <select class="form-control form-select form-select-sm" id="IDMRegion" placeholder="Select Region"></select>
              </div>
              <div class=" col-md-3 form-group mb-4">
                <label for="IDMArea">Area</label>
                <select class="form-control form-select form-select-sm" id="IDMArea" placeholder="Select Area"></select>
              </div>
              <div class=" col-md-3 form-group mb-4">
                <label for="IDMBU">Business Unit</label>
                <select class="form-control form-select form-select-sm" id="IDMBU" placeholder="Select Business Unit"></select>
              </div>          
            </div>
            <div class="row">
              <div class=" col-md-3 form-group mb-4">
                <label for="IDMDepartment">Department</label>
                <select class="form-control form-select form-select-sm" id="IDMDepartment" placeholder="Select Department"></select>
              </div>
              <div class=" col-md-3 form-group mb-4">
                <label for="IDMSection">Section</label>
                <select class="form-control form-select form-select-sm" id="IDMSection" placeholder="Select Section"></select>
              </div>
              <div class="col-md-3 form-group mb-4">
                <label for="IDMsubSection">Sub-Section</label>
                <select class="form-control form-select form-select-sm" id="IDMsubSection" placeholder="Select Sub-Section"></select>
              </div>
              <div class="col-md-3 form-group mb-4">
                <label for="IDManagerPosition">Indirect Manager</label>
                <select class="form-control form-select form-select-sm" id="IDManagerPosition" placeholder="Select Indirect Manager"></select>
              </div>
            </div>
          
          <h5>Cost Centers</h5>
          <div class="${styles.sideLine}"></div>
          <div class="row">
              <div class=" col-md-3 form-group mb-4">
                <label for="cost1">Cost Center 1</label>
                <select class="form-control form-select form-select-sm" id="cost1" placeholder="Select Cost"></select>
              </div>
              <div class=" col-sm-2 form-group">
                <label for="cost1%"></label>
                <input type="number" class="form-control form-control-sm" id="cost1%" placeholder="percent%" min="0" oninput="validatePositiveNumber(this)></input>
              </div>
              <div class=" col-md-3 form-group mb-4">
                <label for="cost2">Cost Center 2</label>
                <select class="form-control form-select form-select-sm" id="cost2" placeholder="Select Cost"></select>
              </div>
              <div class=" col-sm-2 form-group  mb-4">
                <label for="cost2%"></label>
                <input type="number" class="form-control form-control-sm" id="cost2%" placeholder="percent%" min="0" oninput="validatePositiveNumber(this)></input>
              </div>
              <div class=" col-md-3 form-group mb-4">
                <label for="cost3">Cost Center 3</label>
                <select class="form-control form-select form-select-sm" id="cost3" placeholder="Select Cost"></select>
              </div>
              <div class=" col-sm-2 form-group  mb-4">
                <label for="cost3%"></label>
                <input type="number" class="form-control form-control-sm" id="cost3" placeholder="percent%" min="0" oninput="validatePositiveNumber(this)">

              </div>
          </div>

          <div id="SubmitError"></div>
          <div class="d-flex justify-content-end">
            <button type="button" id="btnCancel"class="btn btn-outline btn-md" style="border-color: #a88f69; background-color: white; color: black; margin-right: 10px; font-weight: semibold;">Cancel</button>
            <button type="button" id="btnSubmit" class="btn btn-outline btn-md" style=" background-color: #a88f69; color: white; margin-right: 10px; font-weight: semibold;"  >Create</button>
          </div>

        </div>
  
    `;

    // const listExists = await this.checkIfListExists('Job Design List'); // Replace with your list title
    // if (listExists) {
    //   this.domElement.innerHTML = `<div>List exists!</div>`;
    //   // You can proceed to load your lookup values or other operations
    // } else {
    //   this.domElement.innerHTML = `<div class="text-danger">The list does not exist.</div>`;
    // }


    this._bindEvents();

    document.getElementById('btnSubmit')?.addEventListener('click', (event) => {
      event.preventDefault();
      this.submitForm();
    });

    document.getElementById('btnCancel')?.addEventListener('click', (event) => {
      window.location.href = 'https://andalusiagroupegypt.sharepoint.com/sites/Apps/HR/SitePages/Position-List.aspx';
    });

    document.getElementById('closeToast')?.addEventListener('click', (event) => {
      const toast = document.getElementById("successSubmission") as HTMLSelectElement;

      toast.style.display = "none";
    });
  }

  private async _bindEvents() {

    document.getElementById('positionName')?.addEventListener('change', () => this.validateName());
    document.getElementById('manPower')?.addEventListener('change', () => this.validateManpower());
    // document.getElementById('JobName')?.addEventListener('change', () => this.validateForm());
    // document.getElementById('Group')?.addEventListener('change', () => this.validateForm());
    // document.getElementById('DMGroup')?.addEventListener('change', () => this.validateForm());
    // document.getElementById('DManagerPosition')?.addEventListener('change', () => this.validateForm());

    // Organization Unit Section
    //await this.populateRootDropdown("JobName", "Job Design List", "JobName");
    await this.populateRootDropdown("JobName", "Job Design List", "JobName");
    document.getElementById('JobName')?.addEventListener('change', () => this.populateNodeDropdown("JobName", "Grade", "Job Design List", "Grade_", "JobName"));

    //await this._getGrades();
    //await this.populateRootDropdown("Group", "groups", "GroupName");
    await this.populateRootDropdown("Group", "groups", "GroupName");
    document.getElementById('Group')?.addEventListener('change', () => this.populateNodeDropdown("Group", "Region", "regions", "RegionName", "ParentGroup"));
    document.getElementById('Region')?.addEventListener('change', () => this.populateNodeDropdown("Region", "Area", "areas", "AreaName", "ParentRegion"));
    document.getElementById('Area')?.addEventListener('change', () => this.populateNodeDropdown("Area", "BU", "business unit", "BusinessUnit", "ParentArea"));
    document.getElementById('BU')?.addEventListener('change', () => this.populateNodeDropdown("BU", "Department", "Department", "DepartmentName", "ParentBusinessUnit"));
    document.getElementById('Department')?.addEventListener('change', () => this.populateNodeDropdown("Department", "Section", "sections", "SectionName", "ParentDepartment"));
    document.getElementById('Section')?.addEventListener('change', () => this.populateNodeDropdown("Section", "subSection", "SubSections", "SectionName", "ParentSection"));

    // Direct Manager Section
    //await this.populateRootDropdown("DMGroup", "groups", "GroupName");
    await this.populateRootDropdown("DMGroup", "groups", "GroupName");
    document.getElementById('DMGroup')?.addEventListener('change', () => this.populateNodeDropdown("DMGroup", "DMRegion", "regions", "RegionName", "ParentGroup"));
    document.getElementById('DMRegion')?.addEventListener('change', () => this.populateNodeDropdown("DMRegion", "DMArea", "areas", "AreaName", "ParentRegion"));
    document.getElementById('DMArea')?.addEventListener('change', () => this.populateNodeDropdown("DMArea", "DMBU", "business unit", "BusinessUnit", "ParentArea"));
    document.getElementById('DMBU')?.addEventListener('change', () => this.populateNodeDropdown("DMBU", "DMDepartment", "Department", "DepartmentName", "ParentBusinessUnit"));
    document.getElementById('DMDepartment')?.addEventListener('change', () => this.populateNodeDropdown("DMDepartment", "DMSection", "sections", "SectionName", "ParentDepartment"));
    document.getElementById('DMSection')?.addEventListener('change', () => this.populateNodeDropdown("DMSection", "DMsubSection", "SubSections", "SectionName", "ParentSection"));
    
    document.getElementById('DMGroup')?.addEventListener('change', () => this.populateManagerDropdown2("DManagerPosition", "PositionName", "Group"));
    document.getElementById('DMRegion')?.addEventListener('change', () => this.populateManagerDropdown2("DManagerPosition", "PositionName", "Region"));
    document.getElementById('DMArea')?.addEventListener('change', () => this.populateManagerDropdown2("DManagerPosition", "PositionName", "Area"));
    document.getElementById('DMBU')?.addEventListener('change', () => this.populateManagerDropdown2("DManagerPosition", "PositionName", "businessUnit"));
    document.getElementById('DMDepartment')?.addEventListener('change', () => this.populateManagerDropdown2("DManagerPosition", "PositionName", "Department"));
    document.getElementById('DMSection')?.addEventListener('change', () => this.populateManagerDropdown2("DManagerPosition", "PositionName", "Section"));
    document.getElementById('DMsubSection')?.addEventListener('change', () => this.populateManagerDropdown2("DManagerPosition", "PositionName", "subSection"));

    // InDirect Manager Section
    //await this.populateRootDropdown("IDMGroup", "groups", "GroupName");
    await this.populateRootDropdown("IDMGroup", "groups", "GroupName");
    document.getElementById('IDMGroup')?.addEventListener('change', () => this.populateNodeDropdown("IDMGroup", "IDMRegion", "regions", "RegionName", "ParentGroup"));
    document.getElementById('IDMRegion')?.addEventListener('change', () => this.populateNodeDropdown("IDMRegion", "IDMArea", "areas", "AreaName", "ParentRegion"));
    document.getElementById('IDMArea')?.addEventListener('change', () => this.populateNodeDropdown("IDMArea", "IDMBU", "business unit", "BusinessUnit", "ParentArea"));
    document.getElementById('IDMBU')?.addEventListener('change', () => this.populateNodeDropdown("IDMBU", "IDMDepartment", "Department", "DepartmentName", "ParentBusinessUnit"));
    document.getElementById('IDMDepartment')?.addEventListener('change', () => this.populateNodeDropdown("IDMDepartment", "IDMSection", "sections", "SectionName", "ParentDepartment"));
    document.getElementById('IDMSection')?.addEventListener('change', () => this.populateNodeDropdown("IDMSection", "IDMsubSection", "SubSections", "SectionName", "ParentSection"));

    document.getElementById('IDMGroup')?.addEventListener('change', () => this.populateManagerDropdown2("IDManagerPosition", "PositionName", "Group"));
    document.getElementById('IDMRegion')?.addEventListener('change', () => this.populateManagerDropdown2("IDManagerPosition", "PositionName", "Region"));
    document.getElementById('IDMArea')?.addEventListener('change', () => this.populateManagerDropdown2("IDManagerPosition", "PositionName", "Area"));
    document.getElementById('IDMBU')?.addEventListener('change', () => this.populateManagerDropdown2("IDManagerPosition", "PositionName", "businessUnit"));
    document.getElementById('IDMDepartment')?.addEventListener('change', () => this.populateManagerDropdown2("IDManagerPosition", "PositionName", "Department"));
    document.getElementById('IDMSection')?.addEventListener('change', () => this.populateManagerDropdown2("IDManagerPosition", "PositionName", "Section"));
    document.getElementById('IDMsubSection')?.addEventListener('change', () => this.populateManagerDropdown2("IDManagerPosition", "PositionName", "subSection"));
    
    // cost centers section
    await this.populateRootDropdown("cost1", "Cost Centers", "costCenter");
    await this.populateRootDropdown("cost2", "Cost Centers", "costCenter");
    await this.populateRootDropdown("cost3", "Cost Centers", "costCenter");

    /*await this.populateRootDropdown("cost1", "Cost Centers", "costCenter");
    await this.populateRootDropdown("cost2", "Cost Centers", "costCenter");
    await this.populateRootDropdown("cost3", "Cost Centers", "costCenter");*/

  }

  // private async populateRootDropdown(htmlIDName: string, listName: string, columnName: string) {
  //   const htmlSelect = document.getElementById(htmlIDName) as HTMLSelectElement;
  //   const queryResult = await this.getLookupValues(listName, columnName);
  //   this.displayDropdownoptions(htmlSelect, queryResult);
  // }

  private async populateNodeDropdown(rootIDName: string, nodeIDName: string, listName: string, columnName: string, filterColumnName: string) {

    const filterColName = filterColumnName;
    const colName = columnName;
    const selectedRoot = (document.getElementById(rootIDName) as HTMLSelectElement).value;
    console.log("Selected Root >>> " + selectedRoot);
    const nodeSelect = document.getElementById(nodeIDName) as HTMLSelectElement;
    console.log("Selected Node >>> " + nodeSelect);
    //const queryResult = await sp.web.lists.getByTitle(listName).items.filter(`${filterColName} eq '${selectedRoot}'`).select(colName).get();
    const queryResult = await this.getNodeData(listName,filterColName,selectedRoot,colName);
    console.log("Query Result >>> " + queryResult);
    console.log("*************************************************************************************************************");
    if (colName == "Grade_") {
      this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.Grade_));
    }
    if (colName == "RegionName") {
      this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.RegionName));
    }
    if (colName == "AreaName") {
      this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.AreaName));
    }
    if (colName == "BusinessUnit") {
      this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.BusinessUnit));
    }
    if (colName == "DepartmentName") {
      this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.DepartmentName));
    }
    if (colName == "SectionName" && filterColName == "ParentDepartment") {
      this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.SectionName));
    }
    if (colName == "SectionName") {
      this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.SectionName));
    }

  }

  private displayDropdownoptions(selectElement: HTMLSelectElement, items: string[]) {
   

    if(selectElement.id == "Grade") //handle grade multiselect case
    {
      console.log("Items from displayDP() Function >>> " + items);
      selectElement.innerHTML = '<option value=""></option>';
      const optionValues = items[0].split("/");
  
      optionValues.forEach(item => {
        const option = document.createElement("option");
        option.value = item;
        option.text = item;
        selectElement.appendChild(option);
      });
      
    }
    else //others...
    {
      console.log("Items from displayDP() Function >>> " + items);
      selectElement.innerHTML = '<option value=""></option>';
      items.forEach(item => {
        const option = document.createElement("option");
        option.value = item;
        option.text = item;
        selectElement.appendChild(option);
      });
    }

  }
  //GET using pnpjs
  // private async populateManagerDropdown(nodeIDName: string, columnName: string, filterColumnName: string) {

  //   const nodeSelect = document.getElementById(nodeIDName) as HTMLSelectElement;
  //   console.log("selectedNode :::  " + nodeSelect.id);

  //   const filterColName = filterColumnName;

  //   //For Direct Manager
  //   const selectedGroup = (document.getElementById("DMGroup") as HTMLSelectElement).value;
  //   const selectedRegion = (document.getElementById("DMRegion") as HTMLSelectElement).value;
  //   const selectedArea = (document.getElementById("DMArea") as HTMLSelectElement).value;
  //   const selectedBU = (document.getElementById("DMBU") as HTMLSelectElement).value;
  //   const selectedDepartment = (document.getElementById("DMDepartment") as HTMLSelectElement).value;
  //   const selectedSection = (document.getElementById("DMSection") as HTMLSelectElement).value;
  //   const selectedSubSection = (document.getElementById("DMsubSection") as HTMLSelectElement).value;

  //   //For InDirect Manager
  //   const selectedGroup_IDM = (document.getElementById("IDMGroup") as HTMLSelectElement).value;
  //   const selectedRegion_IDM = (document.getElementById("IDMRegion") as HTMLSelectElement).value;
  //   const selectedArea_IDM = (document.getElementById("IDMArea") as HTMLSelectElement).value;
  //   const selectedBU_IDM = (document.getElementById("IDMBU") as HTMLSelectElement).value;
  //   const selectedDepartment_IDM = (document.getElementById("IDMDepartment") as HTMLSelectElement).value;
  //   const selectedSection_IDM = (document.getElementById("IDMSection") as HTMLSelectElement).value;
  //   const selectedSubSection_IDM = (document.getElementById("IDMsubSection") as HTMLSelectElement).value;

  //   let queryResult: any[] = []; // to store the retrieved data in

  //   //checking the changed dps for direct managers
  //   if (nodeSelect.id == "DManagerPosition") {
  //     if (filterColumnName == "Group") {
  //       queryResult = await sp.web.lists.getByTitle("Position List").items.filter(`${filterColName} eq '${selectedGroup}'`).select("PositionName").get();
  //       this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.PositionName));
  //     }
  //     if (filterColName == "Region") {
  //       queryResult = await sp.web.lists.getByTitle("Position List").items.filter(`Group eq '${selectedGroup}' and ${filterColName} eq '${selectedRegion}'`).select("PositionName").get();
  //       console.log("manager based on GROUP/REGION >>> " + queryResult);
  //       this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.PositionName));

  //     }
  //     if (filterColName == "Area") {
  //       queryResult = await sp.web.lists.getByTitle("Position List").items.filter(`Group eq '${selectedGroup}' and Region eq '${selectedRegion}' and ${filterColName} eq '${selectedArea}' `).select("PositionName").get();
  //       console.log("manager based on GROUP/REGION/AREA >>> " + queryResult);
  //       this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.PositionName));
  //     }
  //     if (filterColName == "businessUnit") {

  //       queryResult = await sp.web.lists.getByTitle("Position List").items.filter(`Group eq '${selectedGroup}' and Region eq '${selectedRegion}' and Area eq '${selectedArea}' and ${filterColName} eq '${selectedBU}' `).select("PositionName").get();
  //       console.log("manager based on GROUP/REGION/AREA/BU >>> " + queryResult);
  //       this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.PositionName));
  //     }
  //     if (filterColName == "Department") {
  //       queryResult = await sp.web.lists.getByTitle("Position List").items.filter(`Group eq '${selectedGroup}' and Region eq '${selectedRegion}' and Area eq '${selectedArea}' and businessUnit eq '${selectedBU}' and ${filterColName} eq '${selectedDepartment}' `).select("PositionName").get();
  //       console.log("manager based on GROUP/REGION/AREA/BU/DEPARTMENT >>> " + queryResult);
  //       this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.PositionName));
  //     }
  //     if (filterColName == "Section") {
  //       queryResult = await sp.web.lists.getByTitle("Position List").items.filter(`Group eq '${selectedGroup}' and Region eq '${selectedRegion}' and Area eq '${selectedArea}' and businessUnit eq '${selectedBU}' and Department eq '${selectedDepartment}' and ${filterColName} eq '${selectedSection}' `).select("PositionName").get();
  //       console.log("manager based on GROUP/REGION/AREA/BU/DEPARTMENT/SECTION >>> " + queryResult);
  //       this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.PositionName));
  //     }
  //     if (filterColName == "subSection") {
  //       queryResult = await sp.web.lists.getByTitle("Position List").items.filter(`Group eq '${selectedGroup}' and Region eq '${selectedRegion}' and Area eq '${selectedArea}' and businessUnit eq '${selectedBU}' and Department eq '${selectedDepartment}' and Section eq '${selectedSection}' and ${filterColName} eq '${selectedSubSection}' `).select("PositionName").get();
  //       console.log("manager based on GROUP/REGION/AREA/BU/DEPARTMENT/SECTION/SUBSECTION >>> " + queryResult);
  //       this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.PositionName));
  //     }
  //   }

  //   //checking the changed dps for Indirect managers
  //   if (nodeSelect.id == "IDManagerPosition") {
  //     if (filterColumnName == "Group") {
  //       console.log("********************** IAM IDM GROUP ********************")
  //       queryResult = await sp.web.lists.getByTitle("Position List").items.filter(`${filterColName} eq '${selectedGroup_IDM}'`).select("PositionName").get();
  //       this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.PositionName));
  //     }
  //     if (filterColName == "Region") {
  //       queryResult = await sp.web.lists.getByTitle("Position List").items.filter(`Group eq '${selectedGroup_IDM}' and ${filterColName} eq '${selectedRegion_IDM}'`).select("PositionName").get();
  //       console.log("manager based on GROUP/REGION >>> " + queryResult);
  //       this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.PositionName));

  //     }
  //     if (filterColName == "Area") {
  //       queryResult = await sp.web.lists.getByTitle("Position List").items.filter(`Group eq '${selectedGroup_IDM}' and Region eq '${selectedRegion_IDM}' and ${filterColName} eq '${selectedArea_IDM}' `).select("PositionName").get();
  //       console.log("manager based on GROUP/REGION/AREA >>> " + queryResult);
  //       this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.PositionName));
  //     }
  //     if (filterColName == "businessUnit") {

  //       queryResult = await sp.web.lists.getByTitle("Position List").items.filter(`Group eq '${selectedGroup_IDM}' and Region eq '${selectedRegion_IDM}' and Area eq '${selectedArea_IDM}' and ${filterColName} eq '${selectedBU_IDM}' `).select("PositionName").get();
  //       console.log("manager based on GROUP/REGION/AREA/BU >>> " + queryResult);
  //       this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.PositionName));
  //     }
  //     if (filterColName == "Department") {
  //       queryResult = await sp.web.lists.getByTitle("Position List").items.filter(`Group eq '${selectedGroup_IDM}' and Region eq '${selectedRegion_IDM}' and Area eq '${selectedArea_IDM}' and businessUnit eq '${selectedBU_IDM}' and ${filterColName} eq '${selectedDepartment_IDM}' `).select("PositionName").get();
  //       console.log("manager based on GROUP/REGION/AREA/BU/DEPARTMENT >>> " + queryResult);
  //       this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.PositionName));
  //     }
  //     if (filterColName == "Section") {
  //       queryResult = await sp.web.lists.getByTitle("Position List").items.filter(`Group eq '${selectedGroup_IDM}' and Region eq '${selectedRegion_IDM}' and Area eq '${selectedArea_IDM}' and businessUnit eq '${selectedBU_IDM}' and Department eq '${selectedDepartment_IDM}' and ${filterColName} eq '${selectedSection_IDM}' `).select("PositionName").get();
  //       console.log("manager based on GROUP/REGION/AREA/BU/DEPARTMENT/SECTION >>> " + queryResult);
  //       this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.PositionName));
  //     }
  //     if (filterColName == "subSection") {
  //       queryResult = await sp.web.lists.getByTitle("Position List").items.filter(`Group eq '${selectedGroup_IDM}' and Region eq '${selectedRegion_IDM}' and Area eq '${selectedArea_IDM}' and businessUnit eq '${selectedBU_IDM}' and Department eq '${selectedDepartment_IDM}' and Section eq '${selectedSection_IDM}' and ${filterColName} eq '${selectedSubSection_IDM}' `).select("PositionName").get();
  //       console.log("manager based on GROUP/REGION/AREA/BU/DEPARTMENT/SECTION/SUBSECTION >>> " + queryResult);
  //       this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.PositionName));
  //     }
  //   }

  // }


  private async populateManagerDropdown2(nodeIDName: string, columnName: string, filterColumnName: string) {

    const nodeSelect = document.getElementById(nodeIDName) as HTMLSelectElement;
    console.log("selectedNode :::  " + nodeSelect.id);

    //const filterColName = filterColumnName;

    //For Direct Manager
    const selectedGroup = (document.getElementById("DMGroup") as HTMLSelectElement).value;
    const selectedRegion = (document.getElementById("DMRegion") as HTMLSelectElement).value;
    const selectedArea = (document.getElementById("DMArea") as HTMLSelectElement).value;
    const selectedBU = (document.getElementById("DMBU") as HTMLSelectElement).value;
    const selectedDepartment = (document.getElementById("DMDepartment") as HTMLSelectElement).value;
    const selectedSection = (document.getElementById("DMSection") as HTMLSelectElement).value;
    const selectedSubSection = (document.getElementById("DMsubSection") as HTMLSelectElement).value;

    //For InDirect Manager
    // const selectedGroup_IDM = (document.getElementById("IDMGroup") as HTMLSelectElement).value;
    // const selectedRegion_IDM = (document.getElementById("IDMRegion") as HTMLSelectElement).value;
    // const selectedArea_IDM = (document.getElementById("IDMArea") as HTMLSelectElement).value;
    // const selectedBU_IDM = (document.getElementById("IDMBU") as HTMLSelectElement).value;
    // const selectedDepartment_IDM = (document.getElementById("IDMDepartment") as HTMLSelectElement).value;
    // const selectedSection_IDM = (document.getElementById("IDMSection") as HTMLSelectElement).value;
    // const selectedSubSection_IDM = (document.getElementById("IDMsubSection") as HTMLSelectElement).value;

    let queryResult: any[] = []; // to store the retrieved data in

    const baseUrl = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Position List')/items`;

    
    let filter: string;

    
    switch (filterColumnName) {
      case "Group":
        filter = `Group eq '${selectedGroup}'`;
        break;
      case "Region":
        filter = `Group eq '${selectedGroup}' and Region eq '${selectedRegion}'`;
        break;
      case "Area":
        filter = `Group eq '${selectedGroup}' and Region eq '${selectedRegion}' and Area eq '${selectedArea}'`;
        break;
      case "businessUnit":
        filter = `Group eq '${selectedGroup}' and Region eq '${selectedRegion}' and Area eq '${selectedArea}' and businessUnit eq '${selectedBU}'`;
        break;
      case "Department":
        filter = `Group eq '${selectedGroup}' and Region eq '${selectedRegion}' and Area eq '${selectedArea}' and businessUnit eq '${selectedBU}' and Department eq '${selectedDepartment}'`;
        break;
      case "Section":
        filter = `Group eq '${selectedGroup}' and Region eq '${selectedRegion}' and Area eq '${selectedArea}' and businessUnit eq '${selectedBU}' and Department eq '${selectedDepartment}' and Section eq '${selectedSection}'`;
        break;
      case "subSection":
        filter = `Group eq '${selectedGroup}' and Region eq '${selectedRegion}' and Area eq '${selectedArea}' and businessUnit eq '${selectedBU}' and Department eq '${selectedDepartment}' and Section eq '${selectedSection}' and subSection eq '${selectedSubSection}'`;
        break;
      default:
        console.error("Invalid filter column name");
        return;
    }
  
    // Construct the full endpoint URL with the filter
    const endpoint = `${baseUrl}?$filter=${filter}&$select=PositionName`;
  
    try {
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(endpoint, SPHttpClient.configurations.v1);
      
      if (response.ok) {
        const jsonResponse = await response.json();
        queryResult = jsonResponse.value; // Get the array of items
        console.log(`manager based on ${filterColumnName} >>> ` + queryResult);
        this.displayDropdownoptions(nodeSelect, queryResult.map(r => r.PositionName));  
      } else {
        console.error("Error fetching data from SharePoint: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }

  }
   
  // GET using pnpjs
  // private async getLookupValues(listName: string, lookupField: string): Promise<any[]> {
  //   try {
  //     const items = await sp.web.lists.getByTitle(listName).items.select(lookupField).get();
  //     return items.map(item => item[lookupField]);
  //   } catch (error) {
  //     console.error("Error retrieving values: ", error);
  //     return [];
  //   }
  // }


  private async populateRootDropdown(htmlIDName: string, listName: string, columnName: string) {
    const htmlSelect = document.getElementById(htmlIDName) as HTMLSelectElement;
    const queryResult = await this.getRootData(listName, columnName);
    this.displayDropdownoptions(htmlSelect, queryResult);
  }

  // GET using SPHttpclient
  private async getRootData(listName: string, lookupField: string): Promise<any[]> {

    const endpoint = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=${lookupField}`;
  
    try {
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(endpoint, SPHttpClient.configurations.v1);
      
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse.value.map((item: any) => item[lookupField]);
      } else {
        console.error("Error retrieving values: ", response.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error retrieving values: ", error);
      return [];
    }
  }
 
   // GET using SPHttpclient
  private async getNodeData(listName: string, filterColName: string, selectedRoot: string, colName: string): Promise<any[]> {
    const endpoint = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/items?$filter=${filterColName} eq '${selectedRoot}'&$select=${colName}`;
  
    try {
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(endpoint, SPHttpClient.configurations.v1);
      
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse.value; // returns the array of filtered list items
      } else {
        console.error("Error fetching data from SharePoint: ", response.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      return [];
    }
  }

  // *********************************************************** Validation methods **************************************************************************

  private validateName(): boolean {

    let isValid = true;

    const regex = /^[A-Za-z0-9 !@#$%^&*()_+\[\]{};':"\\|,.<>?`~]*$/;
    const input = document.getElementById("positionName") as HTMLInputElement;
    let name: string = input.value;
    console.log("Name is >>> " + name);
    const errorMessage = document.getElementById("positionNameError") as HTMLElement;

    if (!regex.test(name)) {
      errorMessage.textContent = "Invalid input! Only English letters, numbers, symbols, and spaces are allowed.";
      name = name.slice(0, -1); // Remove the last character
      isValid = false;
    } else {
      errorMessage.textContent = "";
    }
    //alert("From validateName() isValid is === " + isValid);
    return isValid;
  }

  private async validateManpower(): Promise<boolean> {

    try {
      const jobValue = (document.getElementById("JobName") as HTMLSelectElement).value;
      console.log("job name input >>> " + jobValue);
      const inpManPowerValue = (document.getElementById("manPower") as HTMLSelectElement).value;
      const intManPower = parseInt(inpManPowerValue, 10) || 0;
      const jobPowerItems = await sp.web.lists.getByTitle("Job Design List").items.filter(`JobName eq '${jobValue}'`).select("ManpowerNeeded").get();

      const jobPower = parseInt(jobPowerItems[0].ManpowerNeeded, 10) || 0;
      const allPosPowers = await sp.web.lists.getByTitle("Position List").items.filter(`jobName eq '${jobValue}'`).select("ManpowerNeeded").get();

      const totalManpowerNeeded = allPosPowers.reduce((sum, item) => {
        const manpowerValue = parseInt(item.ManpowerNeeded, 10) || 0;
        return sum + manpowerValue;
      }, 0);

      const error = (document.getElementById("manPowerError") as HTMLSelectElement);

      if (intManPower <= (jobPower - totalManpowerNeeded)) {
        console.log("Added Successfully");
        error.textContent = "";
        return true;
      } else {
        console.log("Can't be added");
        error.textContent = "There is no vacant jobs available to assign this position on";
        return false;
      }
    } catch {
      console.error("An error occurred !!!!!!!!");
      return false;
    }

  }

  private validateForm(): boolean {

    let isValid = true;
    //const submitBtn = document.getElementById("btnSubmit") as HTMLButtonElement;

    // Get the required fields
    const requiredFields = [
      { id: 'positionName', errorMessage: 'Position Name is required' },
      { id: 'JobName', errorMessage: 'Job Name is required' },
      { id: 'Grade', errorMessage: 'Grade and Level is required' },
      { id: 'manPower', errorMessage: 'Manpower is required' },
      { id: 'Group', errorMessage: 'Group is required' },
      { id: 'DMGroup', errorMessage: 'Group is required' },
      { id: 'DManagerPosition', errorMessage: 'Direct Manager is required' },

    ];

    requiredFields.forEach((field) => {
      const fieldElement = document.getElementById(field.id) as HTMLInputElement;
      //console.log("Field .....  " + fieldElement.value);
      const errorElement = document.getElementById(`${field.id}Error`) as HTMLDivElement;

      // Check if the field is empty
      if (fieldElement.value.trim() === '') {

        //alert("Hello from validate form");

        errorElement.innerHTML = field.errorMessage;
        errorElement.style.display = 'block';
        isValid = false;

      } else {

        //submitBtn.disabled = false ;
        //errorElement.textContent = "";
        errorElement.style.display = 'none';
        isValid = true;
      }
    });

    //alert("isValid is : " + isValid);
    return isValid;
  }

  private validatePositiveNumber(input : any): void {
    
    input.value = input.value.replace(/[^0-9]/g, ''); 

    if (input.value && parseFloat(input.value) < 0) {
      input.value = Math.abs(parseFloat(input.value));
    }
  }

  //Form submition
  private submitForm() {
    const posName = (document.getElementById("positionName") as HTMLSelectElement).value;
    const jobName = (document.getElementById("JobName") as HTMLSelectElement).value;
    const levelAndGrade = (document.getElementById("Grade") as HTMLSelectElement).value;
    const manPower = (document.getElementById("manPower") as HTMLSelectElement).value;
    const ouGroup = (document.getElementById("Group") as HTMLSelectElement).value;
    const ouRegion = (document.getElementById("Region") as HTMLSelectElement).value;
    const ouArea = (document.getElementById("Area") as HTMLSelectElement).value;
    const ouBU = (document.getElementById("BU") as HTMLSelectElement).value;
    const ouDept = (document.getElementById("Department") as HTMLSelectElement).value;
    const ouSection = (document.getElementById("Section") as HTMLSelectElement).value;
    const ouSubSection = (document.getElementById("subSection") as HTMLSelectElement).value;

    //const dmGroup = (document.getElementById("DMGroup") as HTMLSelectElement).value;
    const dmPosition = (document.getElementById("DManagerPosition") as HTMLSelectElement).value;
    const idmPosition = (document.getElementById("IDManagerPosition") as HTMLSelectElement).value;


    const cost1 = (document.getElementById("cost1") as HTMLSelectElement).value;
    const cost1Per = (document.getElementById("cost1%") as HTMLSelectElement).value;
    const cost2 = (document.getElementById("cost2") as HTMLSelectElement).value;
    const cost2Per = (document.getElementById("cost2%") as HTMLSelectElement).value;
    const cost3 = (document.getElementById("cost3") as HTMLSelectElement).value;
    const cost3Per = (document.getElementById("cost3%") as HTMLSelectElement).value;


    const error = (document.getElementById("SubmitError") as HTMLSelectElement);

    const isFormValid = this.validateForm();

    if (!isFormValid) {

      //alert("Failed submit request");
      error.innerHTML = `<div class="alert alert-danger"> Please fill in all the required fields</div>`;
      return;

    } else {

      //alert("Hello !! From success submit");
      error.innerHTML = `<div style="display: none;"></div>`

      sp.web.lists.getByTitle("Position List").items.add({
        "PositionName": posName,
        "jobName": jobName,
        "levelAndGrade": levelAndGrade,
        "ManpowerNeeded": manPower,
        "Group": ouGroup,
        "Region": ouRegion,
        "Area": ouArea,
        "businessUnit": ouBU,
        "Department": ouDept,
        "Section": ouSection,
        "subSection": ouSubSection,
        "directManager": dmPosition,
        "InDirectManager": idmPosition,
        "costCenter1": cost1,
        "costCenter1Percentage": cost1Per !== "" && cost1Per !== undefined ? Number(cost1Per) : null,  
        "costCenter2": cost2,
        "costCenter2Percentage": cost2Per !== "" && cost2Per !== undefined ? Number(cost2Per) : null,
        "costCenter3": cost3,
        "costCenter3Percentage": cost3Per !== "" && cost3Per !== undefined ? Number(cost3Per) : null,
      }).then(response => {

        alert("New Position Created Successfully");
        window.location.href = 'https://andalusiagroupegypt.sharepoint.com/sites/Apps/HR/SitePages/Position-List.aspx';
        this.ResetForm();
        return;
      })
    }

  }
 
  private ResetForm(): void {

    (document.getElementById("positionName") as HTMLSelectElement).value = '';
    (document.getElementById("JobName") as HTMLSelectElement).value = '';
    (document.getElementById("Grade") as HTMLSelectElement).value = '';
    (document.getElementById("manPower") as HTMLSelectElement).value = '';
    (document.getElementById("Group") as HTMLSelectElement).value = '';
    (document.getElementById("Region") as HTMLSelectElement).value = '';
    (document.getElementById("Area") as HTMLSelectElement).value = '';
    (document.getElementById("BU") as HTMLSelectElement).value = '';
    (document.getElementById("Department") as HTMLSelectElement).value = '';
    (document.getElementById("Section") as HTMLSelectElement).value = '';
    (document.getElementById("subSection") as HTMLSelectElement).value = '';

    (document.getElementById("DMGroup") as HTMLSelectElement).value = '';
    (document.getElementById("DMRegion") as HTMLSelectElement).value = '';
    (document.getElementById("DMArea") as HTMLSelectElement).value = '';
    (document.getElementById("DMBU") as HTMLSelectElement).value = '';
    (document.getElementById("DMDepartment") as HTMLSelectElement).value = '';
    (document.getElementById("DMSection") as HTMLSelectElement).value = '';
    (document.getElementById("DMsubSection") as HTMLSelectElement).value = '';
    (document.getElementById("DManagerPosition") as HTMLSelectElement).value = '';

    (document.getElementById("IDMGroup") as HTMLSelectElement).value = '';
    (document.getElementById("IDMRegion") as HTMLSelectElement).value = '';
    (document.getElementById("IDMArea") as HTMLSelectElement).value = '';
    (document.getElementById("IDMBU") as HTMLSelectElement).value = '';
    (document.getElementById("IDMDepartment") as HTMLSelectElement).value = '';
    (document.getElementById("IDMSection") as HTMLSelectElement).value = '';
    (document.getElementById("IDMsubSection") as HTMLSelectElement).value = '';
    (document.getElementById("IDManagerPosition") as HTMLSelectElement).value = '';

    (document.getElementById("cost1") as HTMLSelectElement).value = '';
    (document.getElementById("cost1%") as HTMLSelectElement).value = '';
    (document.getElementById("cost2") as HTMLSelectElement).value = '';
    (document.getElementById("cost2%") as HTMLSelectElement).value = '';
    (document.getElementById("cost3") as HTMLSelectElement).value = '';
    (document.getElementById("cost3%") as HTMLSelectElement).value = '';
  }



}

