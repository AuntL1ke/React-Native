import { Switch, View, Text } from "react-native";
import { settingParams } from "../db/schema";
import { useEffect, useState } from "react";
import { getSettingParam, updateSettingParam } from "../db/settingParamsService";
type SettingComponentProps = {
    settingParam:{
        id:number
        name:string
        status:number
    }
}
export default function SettingComponent ({settingParam}:SettingComponentProps){
    const [status, setStatus] = useState<boolean>(!!settingParam.status)

    const onStatusChangeHandler = async () =>{
        setStatus(!status)
        await updateSettingParam(settingParam!.id,!status)
    }
    return(
        <View>
            <Text>{settingParam.name}</Text>
            <Switch
                onChange={()=>{
                    onStatusChangeHandler()
                }}
                value={status}
            />
        </View>
    )
}