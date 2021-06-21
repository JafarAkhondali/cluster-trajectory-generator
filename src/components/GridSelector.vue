<template>

  <v-container>
    <v-row
      class="mb-6"
    >
      <v-col
        md="10"
      > Clusters major points:
        <prism-editor
          style="height: 500px"
          class="my-editor"
          v-model="clustersConfig"
          :highlight="highlighter"
          line-numbers
        >
        </prism-editor>
      </v-col>
      <v-col
        md="2"
        class="mt-6"
      >
        <v-row >
          <v-col md="12">
            <v-text-field
              label="Grid Width"
              type="number"
              v-model="grid_x"
              hide-details="auto"
            ></v-text-field>
          </v-col>

          <v-col md="12">
            <v-text-field
              label="Grid Height"
              type="number"
              v-model="grid_y"
              hide-details="auto"
            ></v-text-field>
          </v-col>

          <v-col md="12">
            <v-text-field
              label="Trajectories Per Cluster"
              type="number"
              v-model="trajs_count"
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row
      no-gutters
    >
      <v-col md="12" class="align-center align-content-center text-center">
        <v-btn
          depressed
          color="primary"
          @click="generateClusters"
          href="#my_dataviz"
          v-smooth-scroll
        >
          Generate Clusters
        </v-btn>
      </v-col>
      <v-col md="12" class="align-center align-content-center text-center">
        <div id="my_dataviz"></div>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Prop, Vue } from 'vue-property-decorator';
import { atan2, cos, norm, random, sin } from 'mathjs';

import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles

import vueSmoothScroll from 'vue-smooth-scroll';
Vue.use(vueSmoothScroll)


@Component
export default class GridSelector extends Vue {

  private grid_x: number = 500;
  private grid_y: number = 500;
  private trajs_count: number = 20;

  // List of visually different colors to render groups
  private COLORS = ["#FF34FF", "#FF4A46", "#008941", "#006FA6", "#A30059", "#FFDBE5", "#7A4900", "#0000A6",
    "#63FFAC", "#B79762", "#004D43", "#8FB0FF", "#997D87", "#5A0007", "#809693", "#FEFFE6", "#1B4400", "#4FC601",
    "#3B5DFF", "#4A3B53", "#FF2F80", "#61615A", "#BA0900", "#6B7900", "#00C2A0", "#FFAA92", "#FF90C9", "#B903AA",
    "#D16100", "#DDEFFF", "#000035", "#7B4F4B", "#A1C299", "#300018", "#0AA6D8", "#013349", "#00846F", "#372101",
    "#FFB500", "#C2FFED", "#A079BF", "#CC0744", "#C0B9B2", "#C2FF99", "#001E09", "#00489C", "#6F0062", "#0CBD66",
    "#EEC3FF", "#456D75", "#B77B68", "#7A87A1", "#788D66", "#885578", "#FAD09F", "#FF8A9A", "#D157A0", "#BEC459",
    "#456648", "#0086ED", "#886F4C", "#34362D", "#B4A8BD", "#00A6AA", "#452C2C", "#636375", "#A3C8C9", "#FF913F",
    "#938A81", "#575329", "#00FECF", "#B05B6F", "#8CD0FF", "#3B9700", "#04F757", "#C8A1A1", "#1E6E00", "#7900D7",
    "#A77500", "#6367A9", "#A05837", "#6B002C", "#772600", "#D790FF", "#9B9700", "#549E79", "#FFF69F", "#201625",
    "#72418F", "#BC23FF", "#99ADC0", "#3A2465", "#922329", "#5B4534", "#FDE8DC", "#404E55", "#0089A3", "#CB7E98",
    "#A4E804", "#324E72", "#6A3A4C", "#83AB58", "#001C1E", "#D1F7CE", "#004B28", "#C8D0F6", "#A3A489", "#806C66",
    "#222800", "#BF5650", "#E83000", "#66796D", "#DA007C", "#FF1A59", "#8ADBB4", "#1E0200", "#5B4E51", "#C895C5",
    "#320033", "#FF6832", "#66E1D3", "#CFCDAC", "#D0AC94", "#7ED379", "#012C58"];
  private clustersConfig: string=`[
    [
        [160, 500],
        [93, 436],
        [247, 294],
        [190, 206],
        [76, 189],
        [98, 89],
        [216, 61],
        [254, 161],
        [266, 257],
        [371, 274],
        [434, 218],
        [430, 94],
        [330, 40],
        [320, 0]
    ],
    [
        [0, 126],
        [42, 93],
        [80, 123],
        [152, 69],
        [213, 60],
        [222, 0]
    ],
    [
        [304, 0],
        [285, 83],
        [230, 141],
        [221, 200],
        [0, 230]
    ],
    [
        [500, 122],
        [297, 138],
        [280, 133],
        [333, 314],
        [500, 320]
    ],
    [
        [500, 256],
        [268, 288],
        [281, 376],
        [375, 386],
        [370, 500]
    ],
    [
        [500, 411],
        [286, 437],
        [275, 397],
        [0, 412]
    ],
    [
        [70, 500],
        [68, 386],
        [176, 387],
        [214, 500]
    ],
    [
        [0, 364],
        [70, 361],
        [73, 161],
        [25, 161],
        [23, 0]
    ],
    [
        [384, 500],
        [400, 400],
        [433, 358],
        [500, 328]
    ],
    [
        [200, 0],
        [194, 170],
        [130, 213],
        [0, 191]
    ],
    [
        [212, 500],
        [207, 185],
        [0, 216]
    ]
]`;

  generateClusters(){
    try {
      const clusterMajorPoints = JSON.parse(this.clustersConfig);
      const SAMPLE_RATE = 10;
      const TRAJECTORY_COUNT_PER_CLUSTER = this.trajs_count;
      clusterMajorPoints.map((cluster: number[], cIndex: number)=>{
        cluster.map((point, pIndex: number) => {
          clusterMajorPoints[cIndex][pIndex][1] = this.grid_x - clusterMajorPoints[cIndex][pIndex][1];
        });
      });

      const clusters: number[][][] = [];
      clusterMajorPoints.map((cluster: number[][], cIndex: number)=>{
        let optional_turn_point;
        let end_point;
        let start_point: number[] = cluster[0];
        let target_points: number[][] = cluster.slice(1);
        let current_cluster_trajectories:number[][] = []

        // ES6 lacks readable syntax for range loops, i'll stick to old school loops :|
        for (let i=0; i<TRAJECTORY_COUNT_PER_CLUSTER; i++){
          let turn_rate = 0.3  // in radian, + or - 1
          let target_point_index = 0
          let last_point: number[] = start_point
          let path:number[][] = [start_point]
          let current_target: number[] = target_points[0]

          while (true){
            let distance = norm([
              current_target[0] - last_point[0],
              current_target[1] - last_point[1]
            ]);

            if (distance <= SAMPLE_RATE * 1.51){
              // we've reached the final target, exit loop
              if (target_point_index + 1 == target_points.length) {
                path.push(current_target)
                break
              }
              target_point_index = target_point_index + 1
              current_target = target_points[target_point_index]
            }

            // Find radian to next target
            const radian_diff = atan2(current_target[1] - last_point[1], current_target[0] - last_point[0])
            // Randomize the path since we don't want to have straight line to target
            const new_radian = random(radian_diff - turn_rate, radian_diff + turn_rate)
            // Calculate next point based on ranomize path to target
            const x = cos(new_radian) * SAMPLE_RATE
            const y = sin(new_radian) * SAMPLE_RATE
            last_point = [last_point[0] + x, last_point[1] + y]
            // Append point to target
            path.push(last_point)
          }
          current_cluster_trajectories.push(path)
        }
        clusters.push(current_cluster_trajectories);
      });


      ///////////////////////////

      // set the dimensions and margins of the graph
      const margin = {
        top: 30, right: 100, bottom: 100, left: 100,
      };
      const width = this.grid_x;
      const height = this.grid_y;

      // append the svg object to the body of the page
      d3.select('#my_dataviz').selectAll("*").remove();
      const svg = d3.select('#my_dataviz')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
          `translate(${margin.left},${margin.top})`);

      // Add X axis --> it is a date format
      const x = d3.scaleLinear()
        .domain([0, this.grid_x])
        .range([0, width]);
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0, this.grid_y])
        .range([height, 0]);
      svg.append('g')
        .call(d3.axisLeft(y));

      // Add the lines
      const line = d3.line()
        .x((d: any) => x(d[0]))
        .y((d: any) => y(d[1]));

      clusters.map((cluster, i) => {
        svg.selectAll('myLines')
          .data(cluster)
          .enter()
          .append('path')
          .attr('d', (d: any) => {
            return line(d);
          })
          .attr('stroke', this.COLORS[i% this.COLORS.length])
          .style('stroke-width', 1)
          .style('fill', 'none');
      });
    } catch (e) {
      console.log(e.message)
      alert(`Generating clusters failed!: {e.message}`);
    }

  }

  mounted() {
    //
  }

  highlighter(code) {
    return highlight(code, languages.json); //returns html
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}


.grid {


}
</style>
