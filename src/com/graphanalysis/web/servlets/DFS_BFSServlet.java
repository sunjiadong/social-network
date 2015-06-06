package com.graphanalysis.web.servlets;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.graphanalysis.web.com.ServletsPreProcess;

/**
 * Servlet implementation class dfsservlet
 */
@WebServlet({ "/dfsservlet", "/json/DFS.json", "/json/dfs.json","/json/BFS.json", "/json/bfs.json" })
public class DFS_BFSServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DFS_BFSServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String deal = request.getProtocol()+"Request:";
		Logger log = Logger.getLogger("serverlog"); 
        log.setLevel(Level.INFO);
        
        String[] args = ServletsPreProcess.PreProcess(request,4);
		log.info(deal+args[0]);
		log.info(deal+args[1]);	
		SolutionEntry.solve(args[0], args, response);
}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request,response);
	}
}