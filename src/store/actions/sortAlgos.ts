import * as actionTypes from './actionTypes'

export const newArray: (size: number) => Object = size => {
    return {
        type: actionTypes.GENERATE_NEW_ARRAY,
        payload: {
            size: size
        }
    }
}

export const setRunning: (param: boolean) => Object = (param) => {
    if(param){
        return {
            type: actionTypes.SET_RUNNING_TRUE
        }
    }
    return {
        type: actionTypes.SET_RUNNING_FALSE
    }
}

export const bubbleSort: (param: any) => Object = (param) => {
    return {
        type: actionTypes.BUBBLE_SORT,
        payload: param
    }
}

export const bubbleSortArray: (arr: number[], speed: number) => any = (arr, speed) => {
    return (dispatch: any) => {
        dispatch(setRunning(true))

        const dispatchAction = (params: number[]) => {
            dispatch(bubbleSort(params.shift()));

            if (!!params.length) {
                setTimeout(() => dispatchAction(params), speed)
            }
            else {
                dispatch(setRunning(false))
            }
        }

        let params: any = [[...arr]]

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                params.push([j, j + 1])
                if (arr[j] > arr[j + 1]) {
                    params.push([j, j + 1, 'swap'])
                    let temp = arr[j + 1]
                    arr[j + 1] = arr[j]
                    arr[j] = temp

                    params.push([...arr])
                    params.push([])
                }
                else {
                    params.push([...arr])
                }
            }
            params.push(arr.length - i - 1)
        }
        // console.log(params)
        dispatchAction(params)

    }
}

export const selectionSort: (param: any) => Object = (param) => {
    return {
        type: actionTypes.SELECTION_SORT,
        payload: param
    }
}

export const selectionSortArray: (arr: number[], speed: number) => any = (arr, speed) => {
    return (dispatch: any) => {
        dispatch(setRunning(true))

        const dispatchAction = (params: number[]) => {
            dispatch(selectionSort(params.shift()));

            if (!!params.length) {
                setTimeout(() => dispatchAction(params), speed)
            }
            else {
                dispatch(setRunning(false))
            }
        }

        let params: any = [[...arr]]
        for (let i = 0; i < arr.length; i++) {
            let minidx = i
            let min = arr[minidx]
            for (let j = i + 1; j < arr.length; j++) {
                params.push([minidx, j])
                if (min > arr[j]) {
                    min = arr[j]
                    minidx = j
                }
            }
            arr[minidx] = arr[i]
            arr[i] = min

            params.push([minidx, i, 'swap'])
            params.push([...arr])
            params.push(i)
        }

        dispatchAction(params)
    }
}

export const insertionSort: (param: any) => Object = (param) => {
    return {
        type: actionTypes.INSERTION_SORT,
        payload: param
    }
}

export const insertionSortArray: (arr: number[], speed: number) => any = (arr, speed) => {
    return (dispatch: any) => {
        dispatch(setRunning(true))

        const dispatchAction = (params: number[]) => {
            dispatch(insertionSort(params.shift()));

            if (!!params.length) {
                setTimeout(() => dispatchAction(params), speed)
            }
            else {
                dispatch(insertionSort(arr.length))
                dispatch(setRunning(false))
            }
        }

        let params: any = [[...arr]]
        let currentVal;
        for (let i = 1; i < arr.length; i++) {
            currentVal = arr[i];
            let j = i - 1
            for (; j >= 0 && arr[j] > currentVal; j--) {
                params.push([j + 1, j + 1])
                arr[j + 1] = arr[j]

                params.push([...arr])
            }
            params.push([j + 1, j + 1, 'insert'])
            arr[j + 1] = currentVal;
            params.push([...arr])
        }

        dispatchAction(params)
    }
}

export const mergeSort: (param: any) => Object = (param) => {
    return {
        type: actionTypes.MERGE_SORT,
        payload: param
    }
}

export const mergeSortArray: (arr: number[], speed: number) => any = (arr, speed) => {
    return (dispatch: any) => {
        dispatch(setRunning(true))

        const dispatchAction = (params: number[]) => {
            dispatch(mergeSort(params.shift()));

            if (!!params.length) {
                setTimeout(() => dispatchAction(params), speed)
            }
            else {
                dispatch(mergeSort(arr.length))
                dispatch(setRunning(false))
            }
        }

        let params: any = [[...arr]]
        // merge sort logic
        const merge = (arr: number[], l: number, m: number, r: number) => {
            let l1 = m + 1;
            while (l <= m && l1 <= r) {
                params.push([l, l1])
                if (arr[l] <= arr[l1]) l++; // proper positions in the subarray
                else {                      // shift the values and insert at correct place
                    let val = arr[l1];
                    let idx = l1;
                    while (idx !== l) {
                        arr[idx] = arr[idx - 1];
                        idx--;
                    }
                    params.push([l, l1, 'swap'])
                    arr[l] = val;
                    l++;
                    m++;
                    l1++;
                }
                params.push([...arr])
            }
        }

        const mergeSortArr = (arr: number[], l: number, r: number) => {
            if (l < r) {
                let mid = Math.floor((l + r) / 2);
                mergeSortArr(arr, l, mid);
                params.push([...arr])
                mergeSortArr(arr, mid + 1, r);
                params.push([...arr])
                merge(arr, l, mid, r);
            }
        }
        mergeSortArr(arr, 0, arr.length - 1)

        dispatchAction(params)
    }
}

export const quickSort: (param: any) => Object = (param) => {
    return {
        type: actionTypes.QUICK_SORT,
        payload: param
    }
}

export const quickSortArray: (arr: number[], speed: number) => any = (arr, speed) => {
    return (dispatch: any) => {
        dispatch(setRunning(true))

        const dispatchAction = (params: number[]) => {
            dispatch(quickSort(params.shift()));

            if (!!params.length) {
                setTimeout(() => dispatchAction(params), speed)
            }
            else {
                dispatch(quickSort(arr.length))
                dispatch(setRunning(false))
            }
        }

        let params: any = [[...arr]]
        // quick sort logic
        const pivot = (arr: number[], start = 0, end = arr.length - 1) => {
            const swap = (arr: number[], idx1: number, idx2: number) => {
                [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
            };

            // We are assuming the pivot is always the first element
            let pivot = arr[start];
            let swapIdx = start;

            for (let i = start + 1; i <= end; i++) {
                if (pivot > arr[i]) {
                    swapIdx++;
                    swap(arr, swapIdx, i);
                    params.push([...arr])
                }
            }

            // Swap the pivot from the start the swapPoint
            swap(arr, start, swapIdx);
            params.push([...arr])
            return swapIdx;
        }


        const quickSortArr = (arr: number[], left = 0, right = arr.length - 1) => {
            if (left < right) {
                let pivotIndex = pivot(arr, left, right)
                //left
                quickSortArr(arr, left, pivotIndex - 1);
                //right
                quickSortArr(arr, pivotIndex + 1, right);
            }
        }
        quickSortArr(arr)

        dispatchAction(params)
    }
}

export const heapSort: (param: any) => Object = (param) => {
    return {
        type: actionTypes.HEAP_SORT,
        payload: param
    }
}

export const heapSortArray: (arr: number[], speed: number) => any = (arr, speed) => {
    return (dispatch: any) => {
        dispatch(setRunning(true))

        const dispatchAction = (params: number[]) => {
            dispatch(heapSort(params.shift()));

            if (!!params.length) {
                setTimeout(() => dispatchAction(params), speed)
            }
            else {
                dispatch(setRunning(false))
            }
        }

        let params: any = [[...arr]]
        // heap sort logic
        let arrLength: number
        const maxHeap = (input: number[], i: number) => {
            const left = 2 * i + 1
            const right = 2 * i + 2
            let max = i
        
            if (left < arrLength && input[left] > input[max]) {
                max = left
                params.push([max, i])
            }
        
            if (right < arrLength && input[right] > input[max])     {
                max = right
                params.push([max, i])
            }
        
            if (max !== i) {
                params.push([max, i])
                swap(input, i, max)
                maxHeap(input, max)
            }
        }
        
        const swap = (input: number[], indexA: number, indexB: number) => {
            params.push([indexA, indexB, 'swap'])
            const temp = input[indexA]
        
            input[indexA] = input[indexB]
            input[indexB] = temp

            params.push([...input])
        }
        
        const heapSortArr = (input: number[]) => {   
            arrLength = input.length
        
            for (let i = Math.floor(arrLength / 2); i >= 0; i -= 1)      {
                maxHeap(input, i)
              }
        
            for (let i = input.length - 1; i >= 0; i--) {
                swap(input, 0, i)
                arrLength--
                params.push(i)
                maxHeap(input, 0)
            }
            params.push([...arr])
        }

        heapSortArr(arr)

        dispatchAction(params)
    }
}