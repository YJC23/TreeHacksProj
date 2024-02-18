import * as React from 'react';

type ActionButtonProps = {
    children: React.ReactNode;
};

const ActionButton: React.FC<ActionButtonProps> = ({ children }) => (
    <button className="w-full text-left p-2 bg-green-300 hover:bg-green-400 rounded transition-colors">
        {children}
    </button>
);

const Story: React.FC = () => {
    // You can manage state and functions here

    return (
        <div className="bg-teal-200 font-sans min-h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="relative mb-4">
                    <input 
                        type="search" 
                        className="w-full p-2 pl-10 rounded border border-gray-300" 
                        placeholder="Choose an emotion: compassion, kindness, respect for a teacher..."
                    />
                </div>

                <h1 className="text-lg text-gray-900 mb-4 text-center">Title here [aka what they type]</h1>

                <div className="flex items-center justify-center space-x-4">
                    <div className="flex justify-center">
                        <img 
                            src="https://placehold.co/300x200.png" 
                            alt="Placeholder image" 
                            className="rounded-lg"
                        />
                    </div>
<div className="flex flex-col space-y-4">
                        <ActionButton>owl should punch the rabbit</ActionButton>
                        <ActionButton>owl should punch the rabbit</ActionButton>
                        <ActionButton>owl should punch the rabbit</ActionButton>
                        <ActionButton>owl should punch the rabbit</ActionButton>
                    </div>
                </div>

                <div className="text-sm text-gray-600 mb-4">caption here: blah blah owl rabbit teacher</div>

                <button className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                    Save your story
                </button>
            </div>
        </div>
    );
};

export { Story };