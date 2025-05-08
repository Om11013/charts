
    //   <Box
    //     sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    //   >
    //     <Typography variant='h5'>Area Chart</Typography>
    //     <AreaChart
    //       ref={ref => {
    //         myRef = ref;
    //       }}
    //       width={900}
    //       height={400}
    //       data={data}
    //       margin={{
    //         top: 5,
    //         right: 30,
    //         left: 20,
    //         bottom: 5,
    //       }}
    //     >
    //       <CartesianGrid strokeDasharray='3 3' />
    //       <XAxis dataKey={csvContext.xLabels} />
    //       <YAxis />
    //       <Tooltip />
    //       <Legend />
    //       {csvContext.chartData &&
    //         csvContext.chartData.map((entry: string) => (
    //           <Area
    //             key={entry}
    //             dataKey={entry}
    //             fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
    //           />
    //         ))}
    //     </AreaChart>
    //     <Button onClick={() => downloadImage(myRef)}>Download Image</Button>
    //   </Box>