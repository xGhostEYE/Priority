import React from 'react';
import PieChart, {
    Legend,
    Export,
    Series,
    Label,
    Font,
    Connector,
} from 'devextreme-react/pie-chart';

export default function Piechart({tasks}) {
    function customizeText(arg) {
        const entry = arg.point.data;
        return `${entry.taskName}\n
                ${entry.weightedGrade}\n
                ${entry.difficulty}\n
                ${entry.taskDeadline}`;
    };

    return (
        <PieChart id="pie"
            dataSource={tasks}
            // title="Hihi"
            // size={
            //     {
            //         minheight: 700,
            //         minwidth: 700,
            //     }
            // }
            diameter={0.6}
            resolveLabelOverlapping="shift"
            palette="Material"
            segmentsDirection="clockwise">
            <Legend
                orientation="horizontal"
                itemTextPosition="right"
                horizontalAlignment="center"
                verticalAlignment="bottom"
                overflow="none"
                wordWrap="none"
                columnCount={4} />
            <Export enabled={true} />
            <Series argumentField="taskName" valueField="weightedGrade">
                <Label
                    visible={true}
                    position="outside"
                    customizeText={customizeText}
                    radialOffset={30}
                >
                    <Font size={16} />
                    <Connector visible={true} width={2} />
                </Label>
            </Series>
        </PieChart>
    );
}
