import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import Papa from 'papaparse';
import { useCsvContext } from '../context/CsvData';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useEffect, useState } from 'react';
import { svgToPng } from '../helpers/svgToPng';
import { dataURLtoFile } from '../helpers/dataURLtoFile';
import { AxiosError } from 'axios';
import { ChartCard } from './ChartCard';

const CSV = () => {
  const csvContext = useCsvContext();
  const data = csvContext.csvData;

  const [chartRefs, setChartRefs] = useState<any>({
    lineChart: null,
    scatterChart: null,
    barChart: null,
    areaChart: null,
    radialBarChart: null,
    pieChart: null,
  });

  const handleCsvUpload = async (event: any) => {
    const file = await event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: results => {
        const firstHundredData = results.data.slice(0, 10);
        csvContext.setCsvData(firstHundredData);
        console.log(csvContext.csvData);
        if (results.meta.fields) csvContext.setCsvMeta(results.meta.fields);
      },
      error: (error: AxiosError) => {
        console.error('Error parsing CSV:', error);
      },
    });
  };

  const downloadImage = async (chartType: string) => {
    const ref = chartRefs[chartType];
    if (ref && ref.container) {
      let svg = ref.container.children[0];
      let pngData = await svgToPng(svg, 1000, 600, 40);
      console.log('png base64...', pngData);
      var file = dataURLtoFile(pngData, `${chartType}.png`);
      console.log('File...', file);
    }
  };

  const setChartRef = (chartType: string, ref: any) => {
    if (ref !== chartRefs[chartType]) {
      setChartRefs((prevRefs: any) => ({
        ...prevRefs,
        [chartType]: ref,
      }));
    }
  };

  useEffect(() => {
    if (csvContext.csvData && csvContext.csvMeta) {
      console.log('Data...', csvContext.csvData);
      console.log('Meta...', csvContext.csvMeta);
    }
  }, [csvContext.csvData, csvContext.csvMeta]);

  useEffect(() => {
    if (csvContext.chartData) console.log(csvContext.chartData);
  }, [csvContext.chartData]);

  return (
    <>
      <Box>
        <Typography>Upload Your Csv Here</Typography>
        <Button variant='outlined' component='label'>
          Upload CSV
          <input type='file' accept='.csv' hidden onChange={handleCsvUpload} />
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          mt: 5,
        }}
      >
        <FormControl sx={{ width: '500px', mr: 2 }}>
          <InputLabel id='x-axis-label'>Select X-axis Label Field</InputLabel>
          <Select
            variant='filled'
            color='primary'
            value={csvContext.xLabels || ''}
            labelId='x-axis-label'
            id='x-axis-select'
            label='X-axis Label'
            onChange={e => {
              csvContext.setXLabels(e.target.value);
            }}
          >
            {csvContext?.csvMeta?.map((element: string) => (
              <MenuItem value={element} key={element}>
                {element}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: '500px', mr: 2 }}>
          <InputLabel id='Select Fields to be plotted'>
            Select Fields to be plotted
          </InputLabel>
          <Select
            variant='filled'
            color='primary'
            multiple
            value={csvContext.chartData || []}
            labelId='x-axis-label'
            id='x-axis-select'
            label='X-axis Data'
            onChange={e => {
              const value = e.target.value;
              csvContext.setChartData(
                typeof value === 'string' ? value.split(',') : value
              );
            }}
            renderValue={selected => selected.join(', ')}
          >
            {csvContext?.csvMeta?.map((element: string, index: number) => (
              <MenuItem value={element} key={index}>
                <Checkbox checked={csvContext.chartData?.includes(element)} />
                <ListItemText primary={element} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 4 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <ChartCard title='Line Chart'>
            <LineChart
              ref={ref => setChartRef('lineChart', ref)}
              width={500}
              height={300}
              data={data}
              margin={{ top: 10, right: 30, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey={csvContext.xLabels} />
              <YAxis />
              <Tooltip />
              <Legend />
              {csvContext.chartData?.map((entry: string) => (
                <Line
                  key={entry}
                  dataKey={entry}
                  stroke={`#${Math.floor(Math.random() * 16777215).toString(
                    16
                  )}`}
                />
              ))}
            </LineChart>
            <Button
              variant='outlined'
              onClick={() => downloadImage('lineChart')}
            >
              Download
            </Button>
          </ChartCard>

          <ChartCard title='Scatter Chart'>
            <ScatterChart
              ref={ref => setChartRef('scatterChart', ref)}
              width={500}
              height={300}
              data={data}
              margin={{ top: 10, right: 30, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey={csvContext.xLabels} />
              <YAxis />
              <Tooltip />
              <Legend />
              {csvContext.chartData?.map((entry: string) => (
                <Scatter
                  key={entry}
                  dataKey={entry}
                  fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                />
              ))}
            </ScatterChart>
            <Button
              variant='outlined'
              onClick={() => downloadImage('scatterChart')}
            >
              Download
            </Button>
          </ChartCard>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <ChartCard title='Bar Chart'>
            <BarChart
              ref={ref => setChartRef('barChart', ref)}
              width={500}
              height={300}
              data={data}
              margin={{ top: 10, right: 30, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray='1 1' />
              <XAxis dataKey={csvContext.xLabels} />
              <YAxis />
              <Tooltip />
              <Legend />
              {csvContext.chartData?.map((entry: string) => (
                <Bar
                  key={entry}
                  dataKey={entry}
                  fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                />
              ))}
            </BarChart>
            <Button
              variant='outlined'
              onClick={() => downloadImage('barChart')}
            >
              Download
            </Button>
          </ChartCard>

          <ChartCard title='Area Chart'>
            <AreaChart
              ref={ref => setChartRef('areaChart', ref)}
              width={500}
              height={300}
              data={data}
              margin={{ top: 10, right: 30, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey={csvContext.xLabels} />
              <YAxis />
              <Tooltip />
              <Legend />
              {csvContext.chartData?.map((entry: string) => (
                <Area
                  key={entry}
                  dataKey={entry}
                  fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                />
              ))}
            </AreaChart>
            <Button
              variant='outlined'
              onClick={() => downloadImage('areaChart')}
            >
              Download
            </Button>
          </ChartCard>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <ChartCard title='Radial Bar Chart'>
            <RadialBarChart
              ref={ref => setChartRef('radialBarChart', ref)}
              width={500}
              height={350}
              cx='50%'
              cy='50%'
              innerRadius='20%'
              outerRadius='90%'
              barSize={20}
              data={data}
            >
              <Tooltip />
              {csvContext.chartData?.map((entry: string) => (
                <RadialBar
                  key={entry}
                  dataKey={entry}
                  label={{
                    position: 'insideStart',
                    fill: '#ffffff',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                  fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                  cornerRadius={10}
                />
              ))}
            </RadialBarChart>

            <Button
              variant='outlined'
              onClick={() => downloadImage('radialBarChart')}
            >
              Download
            </Button>
          </ChartCard>

          <ChartCard title='Pie Chart'>
            <PieChart
              ref={ref => setChartRef('pieChart', ref)}
              width={500}
              height={350}
            >
              {csvContext.chartData?.length > 0 && csvContext.xLabels && (
                <Pie
                  data={data
                    .map((item: { [x: string]: string }) => ({
                      name: item[csvContext.xLabels],
                      value: parseFloat(item[csvContext.chartData[0]]) || 0,
                    }))
                    .filter((item: { value: number }) => !isNaN(item.value))}
                  dataKey='value'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  innerRadius={2}
                  outerRadius={80}
                  fill='#8884d8'
                  label
                >
                  {data.map((_entry: any, index: any) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`#${Math.floor(Math.random() * 16777215).toString(
                        16
                      )}`}
                    />
                  ))}
                </Pie>
              )}
              <Tooltip />
              <Legend />
            </PieChart>
            <Button
              variant='outlined'
              onClick={() => downloadImage('pieChart')}
            >
              Download
            </Button>
          </ChartCard>
        </Box>
      </Box>
    </>
  );
};

export default CSV;
