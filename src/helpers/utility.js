export const API_KEY = 'AIzaSyCm_KVmMP-6xtxlpnrQ8TwS5CC_EycgCBE';
export const AXIOS_URL =
    'https://personal-recipes---public-default-rtdb.europe-west1.firebasedatabase.app/';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    };
};
