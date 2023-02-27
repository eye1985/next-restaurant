import {useRouter} from "next/router";

function EditReservation(){

    const router = useRouter();

    return <div>
        {router.pathname}
    </div>
}

export default EditReservation;