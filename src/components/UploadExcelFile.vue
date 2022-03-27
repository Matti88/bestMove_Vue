<template>
  <div>        
    <h3>Import XLSX</h3>
    <input label="Submit"  type="file" @change="onChangeF"><br><br>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"
import { useLocations } from '@/stores/locations'

export default defineComponent({
name: "UploadExcelFile",
setup(){
    
    const locations = useLocations(); 
    const { onChangeF, searchOptimal, printResults,matrixBestRoutes , printMatrixDistances} = locations;
    return({onChangeF,searchOptimal, printResults,matrixBestRoutes, printMatrixDistances});
    }
}
);
</script>
