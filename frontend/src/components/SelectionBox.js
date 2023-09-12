import { RadioGroup } from '@headlessui/react'
import { useState } from 'react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SelectionBox = ({name, list, activeList, setter }) => {
    const [value, setValue] = useState(list[0])
    
    const handleChange = (e) => {
        setValue(e);
        setter(e);
    }
    return (
        <div className="">
            <RadioGroup value={value} onChange={handleChange} className="mt-4">
                <RadioGroup.Label className="text-sm font-medium text-gray-900"> {name} </RadioGroup.Label>
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {list.map((listItem) => (
                        <RadioGroup.Option
                            key={listItem}
                            value={listItem}
                            disabled={activeList.includes(listItem) ? false : true}
                            className={({ active }) =>
                                classNames(
                                    activeList.includes(listItem) 
                                        ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                        : 'cursor-not-allowed bg-gray-50 text-gray-400',
                                    active ? 'ring-2 ring-indigo-500' : '',
                                    'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                )
                            }
                        >
                            {({ active, checked }) => (
                                <>
                                    <RadioGroup.Label as="span">{listItem}</RadioGroup.Label>
                                    {true ? (
                                        <span
                                            className={classNames(
                                                active ? 'border' : 'border-2',
                                                checked ? 'border-indigo-500' : 'border-transparent',
                                                'pointer-events-none absolute -inset-px rounded-md'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                        >
                                            <svg
                                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                viewBox="0 0 100 100"
                                                preserveAspectRatio="none"
                                                stroke="currentColor"
                                            >
                                                <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                            </svg>
                                        </span>
                                    )}
                                </>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}

export default SelectionBox